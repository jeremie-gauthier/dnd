/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { LobbyEntityStatusType } from './lobby.enum';

type Hero = {
  id: string;
  pickedBy?: string;
};

type LobbyPlayer = {
  userId: string;
  heroesSelected: Hero['id'][];
  isReady: boolean;
};

type LobbyCampaign = {
  id: string;
  title: string;
  nbStages: number;
  stage: {
    id: string;
    title: string;
    order: number;
  };
};

export type LobbyEntity = {
  id: string;
  status: LobbyEntityStatusType;
  host: {
    userId: string;
  };
  config: {
    nbPlayersMax: number;
    campaign: LobbyCampaign;
  };
  players: LobbyPlayer[];
  heroesAvailable: Hero[];
};
