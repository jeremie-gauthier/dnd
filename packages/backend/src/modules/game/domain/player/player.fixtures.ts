import { PlayerStatus } from "../player-status/player-status.vo";

export const FAKE_PLAYER_ID = "00000000-0000-0000-0000-000000000002";

export const getFakePlayerData = () => {
  return {
    userId: FAKE_PLAYER_ID,
    status: new PlayerStatus({ currentPhase: "IDLE" }),
  };
};
