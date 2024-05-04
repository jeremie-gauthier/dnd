import { HeroClassType, StorageSpaceType } from "../enums";
import { StuffStorageCapacityJson } from "../json";
import type { LobbyEntityStatusType } from "./lobby.enum";

type Hero = {
  id: string;
  name: string;
  class: HeroClassType;
  level: number;
  characteristic: {
    baseHealthPoints: number;
    baseManaPoints: number;
    baseArmorClass: number;
    baseMovementPoints: number;
    baseActionPoints: number;
  };
  inventory: {
    storageCapacity: StuffStorageCapacityJson;
    stuff: {
      id: string;
      storageSpace: StorageSpaceType;
      item: {
        name: string;
        level: number;
        imgUrl: string;
      };
    }[];
  };
  pickedBy?: string;
};

type LobbyPlayer = {
  userId: string;
  heroesSelected: Hero["id"][];
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
  gameMaster: {
    userId?: string;
  };
  heroesAvailable: Hero[];
};
