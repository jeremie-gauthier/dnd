import { ClientToServerEvents, ServerToClientEvents } from '@dnd/shared';
import { Socket } from 'socket.io';

export type ServerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  never,
  { userId: string }
>;
