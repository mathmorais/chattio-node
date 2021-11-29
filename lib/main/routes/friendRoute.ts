import express from "express";
import { UserFriendRequestController } from "../controllers/UserFriendRequestController";
import { checkIsAuthenticated } from "../middlewares/chckIsAuthenticated";
import { userFriendRequestService } from "../services/UserFriendRequestService";

const friendRoute = express.Router();

const userFriendRequestController = new UserFriendRequestController(
  userFriendRequestService
);

friendRoute.post(
  "/request",

  checkIsAuthenticated,
  userFriendRequestController.execute
);
friendRoute.post("/accept");

export { friendRoute };
