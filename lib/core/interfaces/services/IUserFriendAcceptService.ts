import { IUser } from "../entities/IUser";

export interface IUserFriendAcceptService {
  handleCheckFriendExist(user: IUser, friendId: string): boolean;
  handleAcceptFriend(userId: string, friendId: string): Promise<void>;
}
