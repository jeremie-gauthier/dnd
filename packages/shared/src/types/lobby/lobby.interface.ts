interface Hero {
  id: string;
  pickedBy?: string;
}

interface LobbyPlayer {
  userId: string;
  heroesSelected: Hero['id'][];
}

export interface LobbyEntity {
  id: string;
  host: {
    userId: string;
  };
  config: {
    nbPlayers: number;
    stageId: string;
  };
  players: LobbyPlayer[];
  heroesAvailable: Hero[];
}
