import { IUserRegisterDTO } from "../../dtos/IUserRegisterDTO";

export interface IUserRegisterService {
  handleRegisterUser(user: IUserRegisterDTO): Promise<string>;
}
