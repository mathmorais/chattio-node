import { Request, Response } from "express";
import { IUserFriendRequestDTO } from "../../core/dtos/IUserFriendRequestDTO";
import { IUserFriendRequestService } from "../../core/interfaces/services/IUserFriendRequestService";
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
      const { friendId } = req.body as IUserFriendRequestDTO;

      await this.service.handleSendFriendRequest(userId, friendId);

      return res.json({ code: "friend.send" });
    } catch (err) {
      const errorCode = err instanceof Error ? err.message : "error.null";
      return res.status(400).json({ errorCode });
    }
  };
}
