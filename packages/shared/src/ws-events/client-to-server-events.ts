import type { LobbyEntity } from "../database/lobby/lobby.interface";
import {
  DiscardGameMasterInput,
  OpenDoorInput,
  PickGameMasterInput,
  PlayableEntityAttackInput,
  PlayableEntityMoveInput,
} from "../schemas";
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
  [ClientLobbyEvent.RequestPickHero]: (payload: {
    lobbyId: string;
    heroId: string;
  }) => void;
  [ClientLobbyEvent.RequestDiscardHero]: (payload: {
    lobbyId: string;
    heroId: string;
  }) => void;
  [ClientLobbyEvent.RequestToggleReadyState]: (payload: {
    lobbyId: string;
  }) => void;
  [ClientLobbyEvent.ListenLobbiesChanges]: () => void;
  [ClientGameEvent.PlayerIsReady]: () => void;
  [ClientGameEvent.PlayableEntityMoves]: (
    payload: PlayableEntityMoveInput,
  ) => void;
  [ClientGameEvent.PlayableEntityTurnEnds]: () => void;
  [ClientGameEvent.PlayableEntityOpenDoor]: (payload: OpenDoorInput) => void;
  [ClientLobbyEvent.RequestPickGameMaster]: (
    payload: PickGameMasterInput,
  ) => void;
  [ClientLobbyEvent.RequestDiscardGameMaster]: (
    payload: DiscardGameMasterInput,
  ) => void;
  [ClientGameEvent.PlayableEntityAttacks]: (
    payload: PlayableEntityAttackInput,
  ) => void;
}

export type ClientToServerEvents =
  EventsMapper<ClientToServerEventsAndPayloads>;
