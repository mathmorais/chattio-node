import { IUserRegisterDTO } from "../../core/dtos/IUserRegisterDTO";
import { handleSignToken } from "../utils/handleSignToken";
import { hash } from "bcryptjs";
import { bcryptConfig } from "../configs/BcryptConfig";
import { IUserRegisterService } from "../../core/interfaces/services/IUserRegisterService";
import { UserModel } from "../models/User";
import { redisClient } from "../initializers/redis";
import { IUser } from "../../core/interfaces/entities/IUser";

class UserRegisterService implements IUserRegisterService {
  async handleCheckEmailAlreadyExist(email: string): Promise<boolean> {
    return (await UserModel.findOne({ email })) != null;
  }

  async handleInstantiateUser({ password, ...others }: IUserRegisterDTO) {
    const hashedPassword = await hash(password, bcryptConfig.saltLenght);
    return new UserModel({
      password: hashedPassword,
      ...others,
    });
  }

  handleUserCaching = (user: IUser): void => {
    redisClient.set(`user:${user.id}`, JSON.stringify(user));
  };

  async handleRegisterUser(userData: IUserRegisterDTO): Promise<string> {
    if (await this.handleCheckEmailAlreadyExist(userData.email)) {
      throw new Error("Email already exists");
    }

    const userModel = await this.handleInstantiateUser(userData);

    await userModel.save();

    this.handleUserCaching(userModel);

    return handleSignToken({ aud: userModel._id });
  }
}

export const userRegisterService = new UserRegisterService();
