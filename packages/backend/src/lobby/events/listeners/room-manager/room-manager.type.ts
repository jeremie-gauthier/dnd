import type { LobbyEvent } from '../../emitters/lobby-events.enum';
import type { UserForceLeftLobbyPayload } from '../../emitters/user-force-left-lobby.payload';
import type { UserJoinedLobbyPayload } from '../../emitters/user-joined-lobby.payload';
import type { UserLeftLobbyPayload } from '../../emitters/user-left-lobby.payload';

export type RoomManagerEventPayloads =
  | UserJoinedLobbyPayload
  | UserLeftLobbyPayload
  | UserForceLeftLobbyPayload;

export type RoomManagerEventNames =
  | LobbyEvent.UserJoinedLobby
  | LobbyEvent.UserLeftLobby
  | LobbyEvent.UserForceLeftLobby;
