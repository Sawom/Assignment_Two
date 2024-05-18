import { Schema } from "mongoose";
import { FullAddress, FullName, Orders, User } from "./user/user.interface";

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

const userSchema = new Schema<User>({
    userId: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    isActive : {type: Boolean, default: true, required:true},
    hobbies: [{type: String, required: true}],
    address: {type: fullAddressSchema},
    orders: [{type: orderSchema }],
})

