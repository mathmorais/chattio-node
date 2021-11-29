export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  friends: [{ user: string | IUser; pending: boolean; roomId: string }];
}
