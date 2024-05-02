import connect from "@/lib/config/db";
import UserDAO from "./user";

connect()


const DAO = {
    User: UserDAO
}

export default DAO
