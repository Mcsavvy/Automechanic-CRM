import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import {
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePassword,
    validatePhoneNumber,
} from "../common/validation";
import mongoose from "mongoose";
import LogDAO from "./log";

interface createUserParams {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

interface updateUserParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
}

async function addUser({
    firstName,
    lastName,
    email,
    phone,
    password,
}: createUserParams) {
    firstName = validateFirstName(firstName);
    lastName = validateLastName(lastName);
    email = validateEmail(email);
    phone = validatePhoneNumber(phone);
    password = validatePassword(password);

    if ((await User.countDocuments({ email, isDeleted: false }).exec()) > 0) {
        throw new Error("User with email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
    });
    await user.save();
    LogDAO.logCreation({
        description: `User ${user.fullName()} created`,
        target: "User",
        targetId: user._id,
        loggerId: user._id,
    });
    return user;
}

async function getUsers() {}

async function updateUser(
    id: mongoose.Types.ObjectId,
    params: updateUserParams
) {
    const firstName = params.firstName
        ? validateFirstName(params.firstName)
        : undefined;
    const lastName = params.lastName
        ? validateLastName(params.lastName)
        : undefined;
    const email = params.email ? validateEmail(params.email) : undefined;
    const phone = params.phone ? validatePhoneNumber(params.phone) : undefined;
    const password = params.password
        ? validatePassword(params.password)
        : undefined;
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;

    if (email && (await User.countDocuments({ email, _id: {"$ne": id}, isDeleted: false }).exec()) > 0) {
        throw new Error("User with email already exists");
    }

    const payload: any = {};
    if (firstName) payload.firstName = firstName;
    if (lastName) payload.lastName = lastName;
    if (email) payload.email = email;
    if (phone) payload.phone = phone;
    if (passwordHash) payload.password = passwordHash;

    const user = await User.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
        new: true,
    });
    if (!user) {
        throw new Error("User not found");
    }
    if (!payload) {
        return user;
    }
    LogDAO.logModification({
        description: `User ${user.fullName()} updated`,
        target: "User",
        targetId: user._id,
        loggerId: user._id,
        details: payload,
    });
    return user;
}

async function deleteUser(id: mongoose.Types.ObjectId) {
    const user = await User.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
    if (!user) {
        throw new Error("User not found");
    }
    LogDAO.logDeletion({
        description: `User ${user.fullName()} deleted`,
        target: "User",
        targetId: user._id,
        loggerId: user._id,
    });
    return user;
}

async function authenticateUser(email: string, password: string) {
    const user = await User.findOne({ email, isDeleted: false});
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: user._id.toHexString() }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRY,
    });
    return token;
}

const UserDAO = {
    addUser,
    getUsers,
    deleteUser,
    updateUser,
    authenticateUser,
};

export default UserDAO;
