import jwt from "jsonwebtoken";
import { jsonWebTokenConfig } from "../configs/JsonWebTokenConfig";

export const handleVerifyToken = <T>(token: string) => {
  return jwt.verify(
    token,
    jsonWebTokenConfig.publicKey,
    jsonWebTokenConfig.verifyOptions
  ) as T;
};
