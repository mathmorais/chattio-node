import express from "express";
import { userLoginService } from "../services/UserLoginService";
import { userRegisterService } from "../services/UserRegisterService";
import { UserLoginController } from "../controllers/UserLoginController";
import { UserRegisterController } from "../controllers/UserRegisterController";

const userRouter = express.Router();

const userLogin = new UserLoginController(userLoginService);
const userRegister = new UserRegisterController(userRegisterService);

userRouter.post("/register", userRegister.execute);
userRouter.post("/login", userLogin.execute);

userRouter.post("/addFriend");

export { userRouter };
