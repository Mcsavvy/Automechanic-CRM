import GoodModel from '@/lib/inventory/models/good';
import mongoose from 'mongoose';
import OrderItemModel from '../models/orderItem';
import OrderModel from '../models/order';

interface Good {
    name: string;
    costPrice: number;
    qty: number;
    description: string;
    minQty: number;
    productId: string;
}

interface OGood {
    name?: string;
    costPrice?: number;
    qty?: number;
    description?: string;
    minQty?: number;
    productId?: string;

}

async function addGood(params: Good) {
    const good = new GoodModel(params);

    // validate the good data

    await good.save();
    return good;
}

async function getGood(id?: mongoose.Types.ObjectId, filters?: OGood) {
    let query = {};
    if (id) query = { _id: id };
    if (filters) query = { ...query, ...filters };
    if (!id && !filters) {
        throw new Error("No values provided")
    }
    const good = await GoodModel.findOne(query).exec();
    if (!good) {
        throw new Error("Good not found");
    }
    return good;
}

async function getGoods(filters?: OGood, page: number = 1, limit: number = 30) {
    if (page < 1) {
        throw new Error("Invalid page number");
    }
    const query = filters ? filters : {};
    const skip = (page - 1) * limit;
    const goods = await GoodModel.find(query).skip(skip).limit(limit).exec();
    const next = goods.length === limit ? page + 1 : null;
    const prev = page > 1 ? page - 1 : null;
    return { goods, next, prev };
}

async function restockGood(id: mongoose.Types.ObjectId, qty: number) {
  return await GoodModel.findByIdAndUpdate(id, { $inc: { qty } }, { new: true });
}


async function updateGood(id: mongoose.Types.ObjectId, params: OGood) {
    return await GoodModel.findByIdAndUpdate(id, params, { new: true });
}

async function deleteGood(id: mongoose.Types.ObjectId) {
    const orderItems = await OrderItemModel.find({ goodId: id });
    const itemIds = orderItems.map(item => item._id);
    const count = await OrderModel.countDocuments({ status: { $in: ['pending', 'paid', 'error'] }, _id: { $in: itemIds } });
    if (count > 0) {
        throw new Error("Cannot delete good with active orders");
    }
    const good = await GoodModel.findByIdAndDelete(id);
    if (!good) {
        throw new Error("Good not found");
    }
    return good;
}
 export default {
    addGood,
    getGood,
    getGoods,
    restockGood,
    updateGood,
    deleteGood
 }