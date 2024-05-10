// A custom repl for the project
import dotenv from "dotenv-flow";

dotenv.config({
    node_env: process.env.NODE_ENV || "development",
    default_node_env: "development",
});

import packageJson from "../../package.json";
import repl from "repl";
import connect from "../dbConnect";
// Import all common models and database operations
import User from "../common/models/user";
import Log from "../common/models/log";
import Group from "../common/models/group";
import UserDAO from "../common/dao/user";
import LogDAO from "../common/dao/log";
import GroupDAO from "../common/dao/group";
// Import all inventory models and database operations
import Buyer from "../inventory/models/buyer";
import Order from "../inventory/models/order";
import Good from "../inventory/models/good";
import OrderItem from "../inventory/models/orderItem";
import BuyerDAO from "../inventory/dao/buyer";
import OrderDAO from "../inventory/dao/order";
import GoodDAO from "../inventory/dao/good";
import InvoiceDAO from "../inventory/dao/invoice";
import OrderItemDAO from "../inventory/dao/orderItem";
import InsightsDAO from "../inventory/dao/insights";
// Import all garage models and database operations
import Customer from "../garage/models/customer";
import Vehicle from "../garage/models/vehicle";
import Service from "../garage/models/service";
import Job from "../garage/models/job";
import Mechanic from "../garage/models/mechanic";
import CustomerDAO from "../garage/dao/customer";
// Import all populator functions into the repl

import populateUsers from "../populate/user";
import populateBuyers from "../populate/buyer";
import populateGoods from "../populate/good";
import populateOrderItems from "../populate/orderItem";
import populateOrders from "../populate/order";
const shellContext = {
    User,
    Log,
    Group,
    Buyer,
    Order,
    Good,
    OrderItem,
    Customer,
    Vehicle,
    Service,
    Job,
    Mechanic,
    ...UserDAO,
    ...LogDAO,
    ...GroupDAO,
    ...BuyerDAO,
    ...OrderDAO,
    ...GoodDAO,
    ...InvoiceDAO,
    ...OrderItemDAO,
    ...CustomerDAO,
    ...InsightsDAO,
    populateUsers,
    populateBuyers,
    populateGoods,
    populateOrderItems,
    populateOrders
};

connect().then(() => {
    console.log(`${packageJson.name} v${packageJson.version}`);
    const r = repl.start();
    for (const [key, value] of Object.entries(shellContext)) {
        Object.defineProperty(r.context, key, {
            configurable: false,
            enumerable: true,
            value,
        });
    }
    r.on("exit", () => {
        process.exit();
    });
});
