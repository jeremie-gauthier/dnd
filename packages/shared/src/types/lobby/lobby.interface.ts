/* eslint-disable @typescript-eslint/consistent-type-definitions */

type Hero = {
  id: string;
  pickedBy?: string;
};

type LobbyPlayer = {
  userId: string;
  heroesSelected: Hero['id'][];
};

export type LobbyEntity = {
  id: string;
  host: {
    userId: string;
  };
  config: {
    nbPlayersMax: number;
    stageId: string;
  };
  players: LobbyPlayer[];
  heroesAvailable: Hero[];
};
