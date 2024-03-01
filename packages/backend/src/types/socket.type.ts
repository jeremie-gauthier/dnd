import { ClientToServerEvents, ServerToClientEvents } from "@dnd/shared";
import { Server, Socket } from "socket.io";

export type WsServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  never,
  { userId: string }
>;

export type ServerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  never,
  { userId: string }
>;

export type MessageContext = {
  server: WsServer;
  client: ServerSocket;
};
