export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  friendId: string;
  friendRequests: [{ user: string | IUser }];
  friends: [{ user: string | IUser; pending: boolean; roomId: string }];
}
