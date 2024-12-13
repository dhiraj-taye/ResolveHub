import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

// User registration and login routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
