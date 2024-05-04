import CustomerModel from "../models/customer";
import {
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePhoneNumber,
} from "../common/validation";
import mongoose, { mongo } from "mongoose";
import LogDAO from "../../common/dao/log";

interface createCustomerParams {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface updateCustomerParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}

async function addCustomer (userId: mongoose.Types.ObjectId, customerData: createCustomerParams) {
    const { firstName, lastName, email, phone } = customerData;
    const customer = new CustomerModel({
        firstName: validateFirstName(firstName),
        lastName: validateLastName(lastName),
        email: validateEmail(email),
        phone: validatePhoneNumber(phone),
    });
    await customer.save();
    LogDAO.logCreation({
        description: `Customer ${customer.email} created`,
        target: "Customer",
        targetId: customer._id,
        loggerId: userId,
    });
    return customer;

}
async function listCustomers( params: updateCustomerParams, internal : boolean = false) {
    let query = { isDeleted: false, ...params}
    if (internal) {
        query.isDeleted = true;
    }
    return await CustomerModel.find(query).lean().exec();
}

async function updateCustomer (userId: mongoose.Types.ObjectId, customerId: mongoose.Types.ObjectId, params: updateCustomerParams, internal: boolean = false){
    const firstName = params.firstName
        ? validateFirstName(params.firstName)
        : undefined;
    const lastName = params.lastName
        ? validateLastName(params.lastName)
        : undefined;
    const email = params.email ? validateEmail(params.email) : undefined;
    const phone = params.phone ? validatePhoneNumber(params.phone) : undefined;
    let query = { _id: customerId, isDeleted: false };
    if (internal) {
        query.isDeleted = true;
    }
    const customer = await CustomerModel.findOne(query);
    if (!customer) {
        throw new Error("Customer not found");
    }
    const details: updateCustomerParams = {};
    const payload: any = {};
    if (firstName){
         payload.firstName = firstName
         details.firstName = customer.firstName

    };
    if (lastName) {
        payload.lastName = lastName;
        details.lastName = customer.lastName;
    }
    if (email) {
        payload.email = email;
        details.email = customer.email;
    }
    if (phone) {
        payload.phone = phone;
        details.phone = customer.phone;
    }
    if (!payload) return customer;

    Object.assign(customer, payload);
    await customer.save();
    LogDAO.logModification({
        description: `User ${customer.email} updated`,
        target: "User",
        targetId: customer._id,
        loggerId: userId,
        details,
    });
    return customer;
}


async function deleteCustomer (userId: mongoose.Types.ObjectId, id: mongoose.Types.ObjectId) {
    const customer = await CustomerModel.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
    if (!customer) {
        throw new Error("Customer not found");
    }
    LogDAO.logDeletion({
        description: `Customer ${customer.email} deleted`,
        target: "Customer",
        targetId: customer._id,
        loggerId: userId,
    });
    return customer;
}

async function getCustomer(id: mongoose.Types.ObjectId, params: updateCustomerParams, internal: boolean = false) {
    let query = { _id: id, isDeleted: false };
    if (internal) {
        query.isDeleted = true;
    }
    if (params) {
        query = { ...query, ...params };
    }
    const results = await CustomerModel.findOne(query).lean().exec();
    return results;

}

const CustomerDAO = {
    addCustomer,
    listCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomer
}

export default CustomerDAO;