import dbConnect from "../../dbConnect";
import UserDAO from "./user";
import LogDAO from "./log";

dbConnect();

const DAO = {
    User: UserDAO,
    Log: LogDAO,
};
export default DAO;
export { UserDAO, LogDAO };
