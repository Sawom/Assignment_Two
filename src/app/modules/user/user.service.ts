import { UserModel } from "../user.model";
import { Orders, User } from "./user.interface";

// create a new user into db
const createUserIntoDB = async (userData: User) => {
  // instance
  const userInstance = new UserModel(userData);
  if (await userInstance.isUserExists(userInstance.userId)) {
    throw new Error("user has already existed");
  }

  const userResult = await userInstance.save();
  return userResult;
};

// get all users from db
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

//**  get single user from db
const getSingleUserFromDB = async (userId: string) => {
  const userIdNumber = Number(userId);

  // instance
  const userInstance = new UserModel({ userId: userIdNumber });
  if (!(await userInstance?.isUserExists(userIdNumber))) {
    throw new Error("user does not exist!");
  }

  const result = await UserModel.findOne({ userId: userIdNumber });
  return result;
};

//**  update user from db
const updateUserFromDB = async (userId: string, userData: User) => {
  const userIdNumber = Number(userId);

  // instance
  const userInstance = new UserModel({ userId: userIdNumber } );
  if (  !(await userInstance?.isUserExists(userIdNumber)) ) {
    throw new Error("user does not exist!");
  }

  const result = await UserModel.findOneAndUpdate({ userId: userIdNumber }, userData);
  return result;
};

//**  add orders
const addOrdersToDB = async (userId: String, orderData: Orders[]) => {
  const userIdNumber = Number(userId);

  // instance
  const userInstance = new UserModel({ userId: userIdNumber } );
  if (  !(await userInstance?.isUserExists(userIdNumber)) ) {
    throw new Error("user does not exist!");
  }

  const user = await UserModel.findOne({ userId: userIdNumber });
  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await UserModel.updateOne(
    { userId: userIdNumber },
    { $push: { orders: { $each: orderData } } }
  );

  if (updatedUser.modifiedCount == 0) {
    throw new Error("Failed to update orders");
  }

  const updatedUserWithOrders = await UserModel.findOne({ userId: userIdNumber });
  return updatedUserWithOrders?.orders || null;
};

//**  get orders
const getOrdersFromDB = async (userId: string) => {
  const userIdNumber = Number(userId);

  // instance
  const userInstance = new UserModel({ userId: userIdNumber } );
  if ( !(await userInstance?.isUserExists(userIdNumber)) ) {
    throw new Error("user does not exist!");
  }

  const result = await UserModel.findOne({ userId: userIdNumber });
  return result;
};

//**  get total price to db
const getTotalPriceInDB = async (userId: string) => {
  const userIdNumber = Number(userId);

  // instance
  const userInstance = new UserModel({ userId: userIdNumber } );
  if ( !(await userInstance?.isUserExists(userIdNumber)) ) {
    throw new Error("user does not exist!");
  }

  const user = await UserModel.findOne({ userId: userIdNumber });
  const result = await UserModel.aggregate([
    { $match: { userId: userIdNumber } },
    { $unwind: "$orders" },

    {
      $group: {
        _id: "$userId",
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },
  ]);
  return result[0]?.totalPrice || 0;
};

//**  delete user
const deleteUserFromDB = async (userId: string) => {
  const userIdNumber = Number(userId);

  // instance
  const userInstance = new UserModel( { userId: userIdNumber } );
  if ( !(await userInstance.isUserExists(userIdNumber)) ) {
    throw new Error("user does not exist");
  }

  const result = await UserModel.updateOne({ userId: userIdNumber }, { isDeleted: true });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  addOrdersToDB,
  getOrdersFromDB,
  getTotalPriceInDB,
  deleteUserFromDB,
};
