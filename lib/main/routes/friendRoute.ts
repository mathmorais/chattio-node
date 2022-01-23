import express from "express";
import { checkIsAuthenticated } from "../middlewares/chckIsAuthenticated";
import { UserFriendAcceptController } from "../controllers/UserFriendAcceptController";
import { UserFriendRequestController } from "../controllers/UserFriendRequestController";
import { userFriendAcceptService } from "../services/UserFriendAcceptService";
import { userFriendRequestService } from "../services/UserFriendRequestService";

const friendRoute = express.Router();

const userFriendRequestController = new UserFriendRequestController(
  userFriendRequestService
);

const userFriendAcceptController = new UserFriendAcceptController(
  userFriendAcceptService
);

friendRoute.post(
  "/request",

  checkIsAuthenticated,
  userFriendRequestController.execute
);

friendRoute.post(
  "/accept",
  checkIsAuthenticated,
  userFriendAcceptController.execute
);

export { friendRoute };
