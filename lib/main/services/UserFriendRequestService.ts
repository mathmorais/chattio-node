import { IUser } from "../../core/interfaces/IUser";
import { IUserFriendRequestService } from "../../core/interfaces/IUserFriendRequestService";
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

  async handleSendFriendRequest(
    userId: string,
    friendId: string
  ): Promise<void> {
    if (userId === friendId) {
      throw new Error("friend.invalid");
    }

    const { friends } = await handleGetCachedUser(userId);

    if (!this.handleCheckAlreadyFriend(friends, friendId)) {
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
          $push: { friends: { user: userId } },
        },
        { new: true }
      );

      this.handleSyncData(updatedUser!, updatedFriend!);
    } else {
      throw new Error("friend.alreadyAdded");
    }
  }
}

export const userFriendRequestService = new UserFriendRequestService();
