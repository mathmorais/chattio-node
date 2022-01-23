import { IUserFriendRequestDTO } from "../../core/dtos/IUserFriendRequestDTO";
import { IUser } from "../../core/interfaces/entities/IUser";
import { IUserFriendRequestService } from "../../core/interfaces/services/IUserFriendRequestService";
import { redisClient } from "../initializers/redis";
import { UserModel } from "../models/User";
import { handleGetCachedUser } from "../utils/handleGetCachedUser";

export class UserFriendRequestService implements IUserFriendRequestService {
  handleCheckAlreadyFriend(friends: IUser["friends"], friendId: string) {
    let alreadyFriend = false;
    friends.forEach((friend) => (alreadyFriend = friend.user === friendId));
    return alreadyFriend;
  }

  async handleSyncData(newUserData: IUser, newFriendData: IUser) {
    const data = [newUserData, newFriendData];

    data.forEach(
      async (user) =>
        await redisClient.set(`user:${user.id}`, JSON.stringify(user))
    );
  }

  /**
   * Maybe, in the future...
   * I'll refactor this part of code
   */

  async handleSendFriendRequest(
    userId: string,
    friendId: string
  ): Promise<void> {
    const { friends } = await handleGetCachedUser(userId);
    if (!this.handleCheckAlreadyFriend(friends, friendId)) {
      try {
        if (userId === friendId) throw new Error();

        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          {
            $push: { friends: { user: friendId } },
          },
          { new: true }
        );

        const updatedFriend = await UserModel.findByIdAndUpdate(
          friendId,
          {
            $push: { friendRequests: { user: userId } },
          },
          { new: true }
        );

        if (updatedUser && updatedFriend) {
          this.handleSyncData(updatedUser, updatedFriend);
        }
      } catch (err) {
        throw new Error("friend.notExist");
      }
    } else {
      throw new Error("friend.alreadyAdded");
    }
  }
}

export const userFriendRequestService = new UserFriendRequestService();
