import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// create a new user
router.post("/", UserController.createUser);

// get a list of all users
router.get('/', UserController.getAllUsers);

//  Retrieve a specific user by ID
router.get('/:userId', UserController.getSingleUser);

// update a single user
router.put('/:userId', UserController.updateUser);

// add order
router.put('/:userId/orders', UserController.addOrder);

// get order
router.get('/:userId/orders', UserController.getOrders);

export const UserRoutes = router;