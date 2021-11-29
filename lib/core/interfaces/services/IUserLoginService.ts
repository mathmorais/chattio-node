import { IUserLoginDTO } from "../dtos/IUserLoginDTO";
import { IUser } from "./IUser";

export interface IUserLoginService {
  handleGetUser(user: IUserLoginDTO): Promise<IUser>;
  handleUserLogin(user: IUserLoginDTO): Promise<string>;
}
