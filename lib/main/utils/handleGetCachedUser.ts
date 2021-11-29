import { IUser } from "../../core/interfaces/IUser";
import { redisClient } from "../initializers/redis";
import { UserModel } from "../models/User";

const handleGetUserDataFallback = async (userId: string): Promise<IUser> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("user.invalid");
  }

  return user;
};

export const handleGetCachedUser = async (userId: string): Promise<IUser> => {
  const unparsedUser = await redisClient.get(`user:${userId}`);

  if (!unparsedUser) {
    return await handleGetUserDataFallback(userId);
  }

  return JSON.parse(unparsedUser);
};
