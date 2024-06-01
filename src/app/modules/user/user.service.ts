import { UserModel } from "../user.model";
import { Orders, User } from "./user.interface";

// create a new user into db
const createUserIntoDB = async (userData: User) => {
  const user = await UserModel.create(userData);
  // const result = await user.save();
  return user;
};

// get all users from db
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// get single user from db
const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findOne({ id });
  return result;
};

// update user from db
const updateUserFromDB = async (id: string, userData: User) => {
  const userId = Number(id);
  const result = await UserModel.findOneAndUpdate({ userId: id }, userData);
  return result;
};

// add orders
const addOrdersToDB = async(id: String, orderData: Orders) =>{
  const userId = Number(id);

  if( !(await UserModel?.isUserExists(userId) ) ){

  }



}





export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
};
