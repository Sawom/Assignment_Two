import  express  from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// create user
router.post('/users', UserController.createUser)


export const UserRoutes = router;