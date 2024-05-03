import connect from "@/lib/dbConnect";
import UserDAO from "./user";
import LogDAO from "./log";

connect()


const DAO = {
    User: UserDAO,
    Log: LogDAO,
}

export default DAO
export { UserDAO, LogDAO}
