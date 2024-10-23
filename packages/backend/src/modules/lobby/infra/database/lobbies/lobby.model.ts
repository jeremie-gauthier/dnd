export type LobbyPersistence = {
  id: string;
  status: "OPENED" | "GAME_INITIALIZING" | "GAME_STARTED";
  host: {
    userId: string;
  };
  config: {
    nbPlayersMax: number;
    campaign: {
      id: string;
      nbStages: number;
      stage: {
        id: string;
        order: number;
      };
    };
  };
  players: Array<{
    userId: string;
    isReady: boolean;
  }>;
  playableCharacters: Array<{
    id: string;
    type: "game_master" | "hero";
    pickedBy?: string;
  }>;
};
