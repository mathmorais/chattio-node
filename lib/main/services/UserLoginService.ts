import { IUserLoginDTO } from "../../core/dtos/IUserLoginDTO";
import { handleSignToken } from "../utils/handleSignToken";
import { IUserLoginService } from "../../core/interfaces/services/IUserLoginService";
import { UserModel } from "../models/User";
import { IUser } from "../../core/interfaces/entities/IUser";
import { compare } from "bcryptjs";

class UserLoginService implements IUserLoginService {
  handleValidateAccount(user: IUserLoginDTO): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  async handleGetUser(user: IUserLoginDTO): Promise<IUser> {
    const foundUser = await UserModel.findOne({
      email: user.email,
    });

    if (!foundUser || !(await compare(user.password, foundUser.password))) {
      throw new Error("login.invalid");
    }

    return foundUser;
  }

  async handleUserLogin(user: IUserLoginDTO): Promise<string> {
    const validatedUser = await this.handleGetUser(user);

    return handleSignToken({ aud: validatedUser.id });
  }
}

export const userLoginService = new UserLoginService();
