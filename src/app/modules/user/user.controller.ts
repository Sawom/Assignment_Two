import { User } from "./user.interface";
import { Request, Response } from "express";
import { UserService } from "./user.service";

// create a new user
const createUser = async(req: Request, res:Response) =>{
    try{
        const user = req.body.user;

        const result = await UserService.createUserIntoDB(user);

        // send response with a message
        res.status(200).json({
            success: true,
            message: "User Created successfully!",
            data: result,
        })

    }
    catch (error: any){

        res.status(500).json({
            success: false,
            message: error.message || "No user found",
            error:{
                code: error.code || 500,
                description: error.message || "User not Found",
            }
        })

    }

}

// get all users
const getAllUsers = async(req: Request, res:Response) =>{
    try{
        const result = await UserService.getAllUsersFromDB();

        // send response
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        })

    }

    catch (error: any){

        res.status(500).json({
            success: false,
            message: error.message || "No user found",
            error:{
                code: error.code || 500,
                description: error.message || "User not Found",
            }
        })

    }

}

// get single user
const getSingleUser = async(req: Request, res:Response) =>{
    try{
        const {userId} = req.params;
        const result = await UserService.getSingleUserFromDB(userId);
        
        res.status(200).json({
            success:true,
            message:  "User fetched successfully!",
            data: result,
        })

    }

    catch (error: any){

        res.status(500).json({
            success: false,
            message: error.message || "No user found",
            error:{
                code: error.code || 500,
                description: error.message || "User not Found",
            }
        })

    }

}

// update single user
const updateUser = async(req: Request, res:Response) =>{
    try{
        const user = req.body;
        const {userId} = req.params;
        const result = await UserService.updateUserFromDB(userId, user);

        res.status(200).json({
            success:true,
            message:  "User fetched successfully!",
            data: result,
        })

    }

    catch (error: any){

        res.status(500).json({
            success: false,
            message: error.message || "User not found",
            error:{
                code: error.code || 500,
                description: error.message || "User not Found",
            }
        })

    }

}

export const UserController ={
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
}