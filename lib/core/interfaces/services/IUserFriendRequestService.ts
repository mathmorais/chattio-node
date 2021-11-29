import { IUser } from "./IUser";

export interface IUserFriendRequestService {
  handleSyncData(newUserData: IUser, newFriendData: IUser): Promise<void>;
  handleCheckAlreadyFriend(
    friends: IUser["friends"],
    friendId: string
  ): boolean;
  handleSendFriendRequest(userId: string, friendId: string): Promise<void>;
}
