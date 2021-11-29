/* eslint-disable @typescript-eslint/ban-types */
import jwt from "jsonwebtoken";
import { jsonWebTokenConfig } from "../configs/JsonWebTokenConfig";

export const handleSignToken = (
  payload: string | object | Buffer = {}
): string => {
  return jwt.sign(
    payload,
    jsonWebTokenConfig.privateKey,
    jsonWebTokenConfig.signOptions
  );
};
