import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// create user
router.post("/", UserController.createUser);

// get user
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
