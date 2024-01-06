import { LobbyEntity } from '../lobby/lobby.interface';
import { ClientGameEvent } from './game-events/game-events.client';
import { ClientLobbyEvent } from './lobby-events/lobby-events.client';
import { EventsMapper } from './utils.type';

interface ClientToServerEventsAndPayloads extends Record<string, (...parameters: any[]) => any> {
  [ClientLobbyEvent.RequestNewGame]: (payload: {
    nbPlayers: number;
    stageId: string;
  }) => LobbyEntity;
  [ClientGameEvent.PlayerIsReady]: () => void;
}

export type ClientToServerEvents = EventsMapper<ClientToServerEventsAndPayloads>;
