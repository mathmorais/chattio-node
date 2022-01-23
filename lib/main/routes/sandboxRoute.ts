import express from "express";
import { UserModel } from "../models/User";

const sandboxRouter = express.Router();

sandboxRouter.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.json(users);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

export { sandboxRouter };
