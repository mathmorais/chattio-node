import express from "express";
import { userRouter } from "./main/routes/userRoute";
import { friendsRoute } from "./main/routes/friendsRoute";
import { sandboxRouter } from "./main/routes/sandboxRoute";

const routeHandler = express.Router();

routeHandler.use("/user", userRouter);
routeHandler.use("/friends", friendsRoute);
routeHandler.use("/sandbox", sandboxRouter);

export { routeHandler };
