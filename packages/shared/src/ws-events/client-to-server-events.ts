import type { LobbyEntity } from "../database/lobby/lobby.interface";
import {
  EndPlayerTurnInput,
  OpenDoorInput,
  PlayableEntityAttackInput,
  PlayableEntityMoveInput,
} from "../game";
import { ClientGameEvent } from "./game-events/game-events.client";
import { ClientLobbyEvent } from "./lobby-events/lobby-events.client";
import type { EventsMapper } from "./utils.type";

interface ClientToServerEventsAndPayloads
  extends Record<string, (...parameters: any[]) => any> {
  [ClientLobbyEvent.RequestCreateLobby]: (payload: {
    nbPlayersMax: number;
    stageId: string;
  }) => LobbyEntity;
  [ClientLobbyEvent.RequestStartLobby]: (payload: { lobbyId: string }) => void;
  [ClientLobbyEvent.RequestJoinLobby]: (payload: { lobbyId: string }) => {
    lobbyId: string;
  };
  [ClientLobbyEvent.RequestLeaveLobby]: () => { lobbyId: string };
  [ClientLobbyEvent.RequestPickPlayableCharacter]: (payload: {
    lobbyId: string;
    playableCharacterId: string;
  }) => void;
  [ClientLobbyEvent.RequestDiscardPlayableCharacter]: (payload: {
    lobbyId: string;
    playableCharacterId: string;
  }) => void;
  [ClientLobbyEvent.RequestToggleReadyState]: (payload: {
    lobbyId: string;
  }) => void;
  [ClientLobbyEvent.ListenLobbiesChanges]: () => void;
  [ClientLobbyEvent.ListenLobbyChanges]: () => void;
  [ClientGameEvent.PlayerIsReady]: () => void;
  [ClientGameEvent.PlayableEntityMoves]: (
    payload: PlayableEntityMoveInput,
  ) => void;
  [ClientGameEvent.PlayableEntityTurnEnds]: (
    payload: EndPlayerTurnInput,
  ) => void;
  [ClientGameEvent.PlayableEntityOpenDoor]: (payload: OpenDoorInput) => void;
  [ClientGameEvent.PlayableEntityAttacks]: (
    payload: PlayableEntityAttackInput,
  ) => void;
}

export type ClientToServerEvents =
  EventsMapper<ClientToServerEventsAndPayloads>;
