import connect from "../config/db";
import UserDAO from "./user";

connect()


const DAO = {
    User: UserDAO
}

export default DAO
