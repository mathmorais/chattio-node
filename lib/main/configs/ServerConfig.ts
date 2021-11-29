class ServerConfig {
  private fallbackPort = 8080;

  get port(): number {
    return Number(process.env.SERVER_PORT ?? this.fallbackPort);
  }

  get jsonMiddlewareConfig(): Record<string, string> {
    return { limit: "50kb", type: "application/json" };
  }
}

export const serverConfig = new ServerConfig();
