import { IUserFriendRequestDTO } from "../../dtos/IUserFriendRequestDTO";
import { IUser } from "../entities/IUser";

export interface IUserFriendRequestService {
  handleSyncData(newUserData: IUser, newFriendData: IUser): Promise<void>;
  handleCheckAlreadyFriend(
    friends: IUser["friends"],
    friendId: string
  ): boolean;
  handleSendFriendRequest(userId: string, friendId: string): Promise<void>;
}
