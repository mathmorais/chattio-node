import { IUserLoginDTO } from "../../dtos/IUserLoginDTO";
import { IUser } from "../entities/IUser";

AbortSignal;
export interface IUserLoginService {
  handleGetUser(user: IUserLoginDTO): Promise<IUser>;
  handleUserLogin(user: IUserLoginDTO): Promise<string>;
}
