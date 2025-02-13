import { LobbyView } from "@dnd/shared";
import { Host } from "../host/host.entity";
import { getFakeHost } from "../host/host.fixtures";
import { LobbyStatus } from "../lobby-status/lobby-status.vo";
import { PlayableCharacter } from "../playable-character/playable-character.entity";
import { getFakeHero } from "../playable-character/playable-character.fixtures";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "../user/user.entity";

export const FAKE_LOBBY_ID = "00000000-0000-0001-0000-000000000000";
export const FAKE_CAMPAIGN_ID = "00000000-0000-0000-0000-000000000010";
export const FAKE_CAMPAIGN_STAGE_ID = "00000000-0000-0000-0000-000000000010";

export const getFakeLobbyData = (): Pick<LobbyView, "config"> & {
  id: string;
  players: Array<User>;
  playableCharacters: Array<PlayableCharacter>;
  host: Host;
  status: LobbyStatus;
} => {
  return {
    config: {
      campaign: {
        id: FAKE_CAMPAIGN_ID,
        nbStages: 10,
        stage: {
          id: FAKE_CAMPAIGN_STAGE_ID,
          order: 2,
        },
      },
      nbPlayersMax: 5,
    },
    playableCharacters: [
      new PlayableCharacter({
        ...getFakeHero(),
        id: "00000000-0000-0000-0000-000000000011",
      }),
      new PlayableCharacter({
        ...getFakeHero(),
        id: "00000000-0000-0000-0000-000000000012",
      }),
      new PlayableCharacter({
        ...getFakeHero(),
        id: "00000000-0000-0000-0000-000000000013",
      }),
      new PlayableCharacter({
        ...getFakeHero(),
        id: "00000000-0000-0000-0000-000000000014",
      }),
    ],
    host: new Host(getFakeHost()),
    id: FAKE_LOBBY_ID,
    players: [
      new User({ userId: getFakeHost().userId, status: new UserStatus(false) }),
    ],
    status: new LobbyStatus("OPENED"),
  };
};
