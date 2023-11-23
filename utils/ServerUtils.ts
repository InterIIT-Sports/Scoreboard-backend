import { Express } from "express";
import { connectToDatabase } from "./DatabaseUtils";
import { Server } from "socket.io";
import { addSocketEvents } from "./SocketUtils";
import { SocketServer } from "../types/SocketServer";

const PORT = process.env.PORT || 5000;

export const createAndStartServer = async (app: Express) => {
  await connectToDatabase();
  const server = app.listen(PORT, () => console.log("[S] Server started at port: " + PORT));
  const _io = new Server(server);
  SocketServer.io = _io;
  addSocketEvents();
};
