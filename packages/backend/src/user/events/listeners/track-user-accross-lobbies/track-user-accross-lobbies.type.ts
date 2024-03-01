import type { UserForceLeftLobbyPayload } from "src/lobby/events/emitters/user-force-left-lobby.payload";
import type { UserJoinedLobbyPayload } from "src/lobby/events/emitters/user-joined-lobby.payload";
import type { UserLeftLobbyPayload } from "src/lobby/events/emitters/user-left-lobby.payload";

export type TrackUserAccrossLobbiesEventPayloads =
  | UserJoinedLobbyPayload
  | UserLeftLobbyPayload
  | UserForceLeftLobbyPayload;
