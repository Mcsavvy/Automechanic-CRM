import connect from "@/lib/dbConnect";
import UserDAO from "../../common/dao/user";
import LogDAO from "./log";
import CustomerDAO from "./customer";

connect()


const DAO = {
    User: UserDAO,
    Log: LogDAO,
    Customer: CustomerDAO,
}

export default DAO
export { UserDAO, LogDAO, CustomerDAO}
