import express from "express";
import { userRouter } from "./main/routes/userRoute";
import { friendRoute } from "./main/routes/friendRoute";
import { sandboxRouter } from "./main/routes/sandboxRoute";

const routeHandler = express.Router();

routeHandler.use("/user", userRouter);
routeHandler.use("/friend", friendRoute);
routeHandler.use("/sandbox", sandboxRouter);

export { routeHandler };
