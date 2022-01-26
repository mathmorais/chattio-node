import { Request, Response } from "express";
import { IUserRegisterService } from "../../core/interfaces/services/IUserRegisterService";

export class UserRegisterController {
  service: IUserRegisterService;

  constructor(implementation: IUserRegisterService) {
    this.service = implementation;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = await this.service.handleRegisterUser(req.body);
      return res.status(200).send({ token });
    } catch (err) {
      const errorCode = err instanceof Error ? err.message : "error.invalid";
      return res.status(401).send({ errorCode });
    }
  };
}
