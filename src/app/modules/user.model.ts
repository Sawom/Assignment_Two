import { Schema, model } from "mongoose";
import { FullAddress, FullName, Orders, User, UserInstanceMethod, UserInstanceModel } from "./user/user.interface";
import config from "../config";

const fullNameSchema = new Schema<FullName>({
    firstName:{
        type: String,
        required: [true, "first name is required"],
        trim: true,
        maxlength: [20, "first name can not be more than 20 character"],
    },
    lastName:{
        type: String,
        required: [true, "last name is required"],
        trim: true,
        maxlength: [20, "last name can not be more than 20 character"],
    },
})

const fullAddressSchema = new Schema<FullAddress>({
    street: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
})

const orderSchema = new Schema<Orders>({
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
})

const userSchema = new Schema<User, UserInstanceMethod , UserInstanceModel>({
    userId: {type: Number, unique: true, required: true},
    username: {type: String, required: true},
    fullname: {type: fullNameSchema, required: true},
    password: {type: String, 
        maxlength: [20, "password can not be more than 20 characters"],
        required: true},
    age: {type: Number, required: true},
    email: {type: String, unique: true, required: true},
    isActive : {type: Boolean, default: true, required:true},
    hobbies: [{type: String, required: true}],
    address: {type: fullAddressSchema},
    orders: [{type: orderSchema }],
    isDeleted:{ type: Boolean, default: false, }
})

userSchema.methods.isUserExists = async function(userId: number | string): Promise<User | null> {
    const existingUser = await UserModel.findOne({ userId : userId });
    return existingUser;
}

export const UserModel = model<User, UserInstanceModel>("User", userSchema);