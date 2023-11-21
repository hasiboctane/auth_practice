import express from "express";
import UserController from "../controllers/user.controller.js";
const userRouter = express.Router();

// public routes 
userRouter.get('/', UserController.getAll)
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

// private routes 
export default userRouter;