import { IUser } from "../../core/interfaces/entities/IUser";
import { IUserFriendRequestService } from "../../core/interfaces/services/IUserFriendRequestService";
import { redisClient } from "../initializers/redis";
import { UserModel } from "../models/User";
import { handleGetCachedUser } from "../utils/handleGetCachedUser";

class UserFriendRequestService implements IUserFriendRequestService {
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

	async handleGetUserFromFriendId(friendId: string) {
		const user = await UserModel.findOne({ friendId: friendId });
		if (!user) {
			throw new Error("friend.notExist");
		}
		return user;
	}

	async handleSendFriendRequest(
		userId: string,
		friendId: string
	): Promise<void> {
		const user = await handleGetCachedUser(userId);
		const friend = await this.handleGetUserFromFriendId(friendId);

		if (!this.handleCheckAlreadyFriend(user.friends, friend.id)) {
			try {
				await UserModel.updateOne(
					{ id: userId },
					{
						$push: { friends: { user: friend.id } },
					}
				);
				await UserModel.updateOne(
					{ id: friend.id },

					{
						$push: { friendRequests: { user: userId } },
					}
				);
			} catch (err) {
				throw new Error("friend.notExist");
			}
		} else {
			throw new Error("friend.alreadyAdded");
		}
	}
}

export const userFriendRequestService = new UserFriendRequestService();
