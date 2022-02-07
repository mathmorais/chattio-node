import { ConnectOptions } from "mongoose";

class DatabaseConfig {
  get url(): string {
    if (!process.env.MONGO_URL) {
      throw new Error("Missing MONGO_URL enviroment variable");
    }

    return process.env.MONGO_URL;
  }

  get options(): Partial<ConnectOptions> | undefined {
    return { dbName: "chattio" };
  }
}

export const databaseConfig = new DatabaseConfig();
