import { LobbyView } from "@dnd/shared";
import { List } from "src/modules/shared/domain/list";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { Host } from "../host/host.entity";
import { FAKE_HOST } from "../host/host.fixtures";
import { LobbyStatus } from "../lobby-status/lobby-status.vo";
import { PlayableCharacter } from "../playable-character/playable-character.entity";
import { FAKE_HERO } from "../playable-character/playable-character.fixtures";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "../user/user.entity";

export const FAKE_LOBBY_ID = "00000000-0000-0001-0000-000000000000";
export const FAKE_CAMPAIGN_ID = "00000000-0000-0000-0000-000000000010";
export const FAKE_CAMPAIGN_STAGE_ID = "00000000-0000-0000-0000-000000000010";

export const getFakeLobbyData = (): Pick<LobbyView, "config"> & {
  id: UniqueId;
  players: List<User>;
  playableCharacters: List<PlayableCharacter>;
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
          intro: "this is the intro",
          order: 2,
          outro: "this is the outro",
          title: "Fake Campaign Stage 2/10",
        },
        title: "Fake Campaign",
      },
      nbPlayersMax: 5,
    },
    playableCharacters: new List([
      new PlayableCharacter({
        ...FAKE_HERO,
        id: new UniqueId("00000000-0000-0000-0000-000000000011"),
      }),
      new PlayableCharacter({
        ...FAKE_HERO,
        id: new UniqueId("00000000-0000-0000-0000-000000000012"),
      }),
      new PlayableCharacter({
        ...FAKE_HERO,
        id: new UniqueId("00000000-0000-0000-0000-000000000013"),
      }),
      new PlayableCharacter({
        ...FAKE_HERO,
        id: new UniqueId("00000000-0000-0000-0000-000000000014"),
      }),
    ]),
    host: new Host(FAKE_HOST),
    id: new UniqueId(FAKE_LOBBY_ID),
    players: new List([
      new User({ userId: FAKE_HOST.userId, status: new UserStatus(false) }),
    ]),
    status: new LobbyStatus({ status: "OPENED" }),
  };
};
