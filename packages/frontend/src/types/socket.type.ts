import { ClientToServerEvents, ServerToClientEvents } from "@dnd/shared";
import { Socket } from "socket.io-client";

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
