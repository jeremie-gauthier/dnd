import type { ClientToServerEvents, ServerToClientEvents } from "@dnd/shared";
import type { Socket } from "socket.io-client";

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
