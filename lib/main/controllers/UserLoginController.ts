import { Request, Response } from "express";
import { IUserLoginService } from "../../core/interfaces/services/IUserLoginService";

export class UserLoginController {
  service: IUserLoginService;

  constructor(implementation: IUserLoginService) {
    this.service = implementation;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = await this.service.handleUserLogin(req.body);
      return res.status(200).send({ token });
    } catch (err) {
      const errorCode = err instanceof Error ? err.message : "error.invalid";
      return res.status(401).send({ errorCode });
    }
  };
}
