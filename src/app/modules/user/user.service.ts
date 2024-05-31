import { UserModel } from "../user.model";
import { User } from "./user.interface";

// create a new user into db
const createUserIntoDB = async (userData: User) =>{
    const user = await UserModel.create(userData)
    // const result = await user.save();
    return user;
}

// get all users from db
const getAllUsersFromDB = async() =>{
    const result = await UserModel.find();
    return result;
}

// get single user from db
const getSingleUserFromDB = async(id: string) => {
    const result = await UserModel.findOne({id});
    return result;
}


export const UserService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
}