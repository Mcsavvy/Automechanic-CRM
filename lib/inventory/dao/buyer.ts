import mongoose from 'mongoose';
import { BuyerModel } from '../models/buyer';
import { OrderModel } from '../models/order';

interface Buyer {
    name: string;
    phone: string;
    email?: string;
}

async function addBuyer(params: Buyer) {
    const { name, phone, email } = params;

    // validate the buyer data

    const buyer = new BuyerModel({
        name,
        phone,
        email,
    });
    await buyer.save();
    return buyer;
}

async function getBuyers(filters?: Partial<Buyer>, page: number = 1, limit: number = 30) {
    if (page < 1) {
        throw new Error("Invalid page number");
    }
    const query = filters ? filters : {};
    const skip = (page - 1) * limit;
    const buyers = await BuyerModel.find(query).skip(skip).limit(limit).exec();
    const next = buyers.length === limit ? page + 1 : null;
    const prev = page > 1 ? page - 1 : null;
    return { buyers, next, prev };
}

async function getBuyer(id?: mongoose.Types.ObjectId, filters?: Partial<Buyer>) {
    let query = {};
    if (id) query = { _id: id };
    if (filters) query = { ...query, ...filters };
    if (!id && !filters) {
        throw new Error("No values provided")
    }
    const buyer = await BuyerModel.findOne(query).exec();
    if (!buyer) {
        throw new Error("Buyer not found");
    }
    return buyer;
}

async function updateBuyer(id: mongoose.Types.ObjectId, params: Partial<Buyer>, buyerData: Partial<Buyer>) {
    if (params.name) {
        throw new Error("Cannot change a buyer's name")
    }
    let query = {};
    if (id) query = { _id: id };
    if (params) query = { ...query, ...params };
    const buyer = await BuyerModel.findOneAndUpdate(query, buyerData)
    if (!buyer) {
        throw new Error("Buyer not found");
    }
    return buyer
}

async function deleteBuyer(id: mongoose.Types.ObjectId) {
    const count = await OrderModel.countDocuments({ buyerId: id, $or: [{ status: 'pending' }, { status: 'error' }, { amountPaid: { $gt: 0 } }] });
    if (count > 0) {
        throw new Error("Buyer can't be deleted as he has pending business here")
    }
    const buyer = await BuyerModel.findOneAndDelete({ _id: id });
    if (!buyer) {
        throw new Error("Buyer not found");
    }
    return buyer;
}

const BuyerDAO = {
    addBuyer,
    getBuyers,
    getBuyer,
    updateBuyer,
    deleteBuyer
}
export default BuyerDAO