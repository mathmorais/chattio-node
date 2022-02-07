import { IUserFriendAcceptService } from "../../core/interfaces/services/IUserFriendAcceptService";
import { Request, Response } from "express";
export class UserFriendAcceptController {
	private service: IUserFriendAcceptService;

	constructor(service: IUserFriendAcceptService) {
		this.service = service;
	}

	execute = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { userId, friendId } = req.body;

			await this.service.handleAcceptFriend(userId, friendId);

			return res.status(200).json({ code: "friend.accepted" });
		} catch (err) {
			const errorCode = err instanceof Error ? err.message : "error.null";
			return res.status(401).json({ code: errorCode });
		}
	};
}
