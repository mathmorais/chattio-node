import { Request, Response } from "express";
import { IUserFriendRequestService } from "../../core/interfaces/IUserFriendRequestService";
import { handleVerifyToken } from "../utils/handleVerifyToken";

export class UserFriendRequestController {
  private service: IUserFriendRequestService;

  constructor(implementation: IUserFriendRequestService) {
    this.service = implementation;
  }

  execute = async (req: Request, res: Response): Promise<Response> => {
    try {
      const [_, token] = req.headers.authorization!.split(" ");

      const userId = handleVerifyToken<{ aud: string }>(token).aud;
      const friendId = req.body.uid;

      console.log(userId, friendId);

      await this.service.handleSendFriendRequest(userId, friendId);

      return res.send({ code: "friendRequest.send" });
    } catch (err) {
      const errorCode = err instanceof Error ? err.message : "error.invalid";
      return res.status(400).send({ errorCode });
    }
  };
}
