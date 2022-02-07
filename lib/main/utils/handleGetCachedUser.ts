import { IUser } from "../../core/interfaces/entities/IUser";
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
    const databaseUser = await handleGetUserDataFallback(userId);
    redisClient.set(`user:${userId}`, JSON.stringify(databaseUser));
    return databaseUser;
  }

  return JSON.parse(unparsedUser);
};
