import type { ClientToServerEvents, ServerToClientEvents } from "@dnd/shared";
import type { Server, Socket } from "socket.io";

export interface WsServer
  extends Server<
    ClientToServerEvents,
    ServerToClientEvents,
    never,
    { userId: string }
  > {}

export interface ServerSocket
  extends Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    never,
    { userId: string }
  > {}
