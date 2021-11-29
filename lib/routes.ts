import express from "express";
import { userRouter } from "./main/routes/userRoute";
import { friendRoute } from "./main/routes/friendRoute";

const routeHandler = express.Router();

routeHandler.use("/user", userRouter);
routeHandler.use("/friend", friendRoute);

export { routeHandler };
