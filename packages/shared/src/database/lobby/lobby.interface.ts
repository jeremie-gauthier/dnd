import { HeroClassType } from "../enums";
import type { LobbyEntityStatusType } from "./lobby.enum";

type Hero = {
  id: string;
  name: string;
  class: HeroClassType;
  level: number;
  baseHealthPoints: number;
  baseManaPoints: number;
  baseArmorClass: number;
  baseMovementPoints: number;
  baseActionPoints: number;
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
  heroesAvailable: Hero[];
};
