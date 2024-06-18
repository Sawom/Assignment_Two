import { Request, Response } from "express";
import { UserService } from "./user.service";
import userValidationZodSchema from "./user.zod.validation";

// create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    // data validation with zod
    const zodParsedData = userValidationZodSchema.parse(user);
    const result = await UserService.createUserIntoDB(zodParsedData);

    // send response with a message
    res.status(200).json({
      success: true,
      message: "User Created successfully!",
      data: result,
      });
    } 
  catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();

    // send response
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } 
  catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    });
  }

};

// update single user
const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { userId } = req.params;
    const result = await UserService.updateUserFromDB(userId, user);

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } 
  catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    });
  }
  
};

// add order
const addOrder = async (req: Request, res: Response) => {
  try {
    const { productName, price, quantity } = req.body;
    const { userId } = req.params;

    const result = await UserService.addOrdersToDB(userId, [
      { productName, price, quantity },
    ]);

    res.status(200).json({
      success: true,
      message: "Order added successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Order not found",
      error: {
        code: error.code || 500,
        description: error.message || "Order not Found",
      },
    });
  }
};

// get orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getOrdersFromDB(userId);

    if (!result) {
      throw new Error(" Failed to fetch orders");
    }
    const orders = result.orders;

    res.status(200).json({
      success: true,
      message: "Order got successfully!",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Orders not found",
      error: {
        code: error.code || 500,
        description: error.message || "Orders not Found",
      },
    });
  }
};

// get total price
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getTotalPriceInDB(userId);

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Total price not found",
      error: {
        code: error.code || 500,
        description: error.message || "Total price not Found",
      },
    });
  }
};

// delete users
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User deleted successfully!",
      error: {
        code: error.code || 500,
        description: error.message || "User deleted successfully!",
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  addOrder,
  getOrders,
  getTotalPrice,
  deleteUser,
};
