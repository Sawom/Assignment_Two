import { UserModel } from "../user.model";
import { Orders, User } from "./user.interface";

// create a new user into db
const createUserIntoDB = async (userData: User) => {
  // instance
  const userInstance = new UserModel(userData.userId)
  if( await userInstance.isUserExists(userInstance.id) ){
     throw new Error("user has already existed");
  }

  const user = await UserModel.create(userData);
  return user;
};


// get all users from db
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};


// get single user from db
const getSingleUserFromDB = async (id: string) => {
  // instance
  const userInstance = new UserModel(id)
  if( await userInstance.isUserExists(id) ){
     throw new Error("user does not exist!");
  }

  const result = await UserModel.findOne({ id });
  return result;
};


// update user from db
const updateUserFromDB = async (id: string, userData: User) => {
  const userId = Number(id);

  // instance
  const userInstance = new UserModel(id)
  if( await userInstance.isUserExists(id) ){
     throw new Error("user does not exist!");
  }

  const result = await UserModel.findOneAndUpdate({ userId: id }, userData);
  return result;
};


// add orders
const addOrdersToDB = async(id: String, orderData: Orders[] ) =>{
  const userId = Number(id);

  // instance
  const userInstance = new UserModel(orderData)
  if( await userInstance.isUserExists(userInstance.id) ){
     throw new Error("user do not exist");
  }

  const user = await UserModel.findOne({userId: id})
  if (!user) {
    throw new Error("User not found")
  }

  const updatedUser = await UserModel.updateOne(
    {userId: id},
    {$push: {orders: {$each: orderData } } },
  )

  if( updatedUser.modifiedCount == 0 ){
    throw new Error("Failed to update orders");
  }

  const updatedUserWithOrders = await UserModel.findOne({ userId: id })
  return updatedUserWithOrders?.orders || null ;
}


// get orders
const getOrdersFromDB = async(id: string) =>{
  const result = await UserModel.findOne({userId: id});
  return result;
}


// get total price to db
const getTotalPriceInDB = async(id: string) =>{
  const userIdNo = Number(id);

  // instance
  const userInstance = new UserModel(userIdNo)
  if( await userInstance.isUserExists(userInstance.id) ){
     throw new Error("user do not exist");
  }

  const user = await UserModel.findOne({userId: id})
  const result = await UserModel.aggregate([
    {$match :{userId: userIdNo }},
    {$unwind: "$orders" },

    {
      $group:{
        _id: "$userId",
        totalPrice:{
          $sum: {$multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },

  ])
  return result[0]?.totalPrice || 0;
}


export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  addOrdersToDB,
  getOrdersFromDB,
  getTotalPriceInDB,
};
