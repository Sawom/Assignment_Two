import { UserModel } from "../user.model";
import { User } from "./user.interface";

const createUserIntoDB = async (userData: User) =>{
    const user = await UserModel.create(userData)
    const result = await user.save();
    return result;
}

export const UserService = {
    createUserIntoDB,
}