import { IUserFriendAcceptService } from "../../core/interfaces/services/IUserFriendAcceptService";
import { IUser } from "../../core/interfaces/entities/IUser";

import { handleGetCachedUser } from "../utils/handleGetCachedUser";
import { UserModel } from "../models/User";
import { redisClient } from "../initializers/redis";

class UserFriendAcceptService implements IUserFriendAcceptService {
  handleCheckFriendExist(user: IUser, friendId: string): boolean {
    console.log(user);

    return (
      user.friendRequests.length > 0 &&
      user.friendRequests.some((friend) => {
        return friend.user === friendId;
      })
    );
  }

  async handleAcceptFriend(userId: string, friendId: string): Promise<void> {
    const cachedUser = await handleGetCachedUser(userId);
    console.log(this.handleCheckFriendExist(cachedUser, friendId));

    if (this.handleCheckFriendExist(cachedUser, friendId)) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: { friendRequests: { user: friendId } },
          $push: { friends: { user: friendId, pending: false } },
        },
        { new: true }
      );
      const updatedFriend = await UserModel.findByIdAndUpdate(
        friendId,
        {
          $set: { friends: { user: userId, pending: false } },
        },
        { new: true }
      );

      redisClient.set(`user:${userId}`, JSON.stringify(updatedUser));
      redisClient.set(`user:${friendId}`, JSON.stringify(updatedFriend));
    } else {
      throw new Error("friend.notFound");
    }
  }
}

export const userFriendAcceptService = new UserFriendAcceptService();
