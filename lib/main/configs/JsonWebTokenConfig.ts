import { SignOptions, VerifyOptions } from "jsonwebtoken";

class JsonWebTokenConfig {
  get signOptions(): SignOptions {
    return { algorithm: "RS256", expiresIn: "7d" };
  }

  get verifyOptions(): VerifyOptions {
    return {};
  }

  get privateKey(): string {
    if (!process.env.JWT_PRIVATE_KEY)
      throw new Error("Missing jwt private key");
    else return process.env.JWT_PRIVATE_KEY;
  }

  get publicKey(): string {
    if (!process.env.JWT_PUBLIC_KEY) throw new Error("Missing jwt public key");
    else return process.env.JWT_PUBLIC_KEY;
  }
}

export const jsonWebTokenConfig = new JsonWebTokenConfig();
