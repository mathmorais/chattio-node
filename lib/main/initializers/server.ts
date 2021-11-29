import express from "express";
import { serverConfig } from "../configs/ServerConfig";
import { routeHandler } from "../../routes";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }), express.json(serverConfig.jsonMiddlewareConfig));

app.use("/api", routeHandler);

const server = app.listen(serverConfig, () => {
  console.info("Server listening on port", serverConfig.port);
});

const io = new Server(server);

export { server, io };
