import { describe, expect, it } from "vitest";
import { HostError } from "../host/host.error";
import { getFakeHost } from "../host/host.fixtures";
import { LobbyStatusError } from "../lobby-status/lobby-status.error";
import { LobbyStatus } from "../lobby-status/lobby-status.vo";
import { PlayableCharacter } from "../playable-character/playable-character.entity";
import { PlayableCharacterError } from "../playable-character/playable-character.error";
import {
  FAKE_HERO_ID,
  getFakeHero,
} from "../playable-character/playable-character.fixtures";
import { UserStatusError } from "../user-status/user-status.error";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "../user/user.entity";
import { FAKE_USER_ID, getFakeUserData } from "../user/user.fixtures";
import { Lobby } from "./lobby.aggregate";
import { LobbyError } from "./lobby.error";
import { FAKE_LOBBY_ID, getFakeLobbyData } from "./lobby.fixtures";

describe("Lobby Aggregate", () => {
  const createTestLobby = (data: ReturnType<typeof getFakeLobbyData>) =>
    new Lobby({ NODE_ENV: "test" }, data);

  describe("constructor", () => {
    it("should create a LobbyAggregate and access its data", () => {
      const lobby = createTestLobby(getFakeLobbyData());

      expect(lobby.id).toEqual(FAKE_LOBBY_ID);
      expect(lobby.toPlain().config).toEqual(getFakeLobbyData().config);
    });
  });

  describe("join method", () => {
    it("should add a user in the lobby", () => {
      const lobby = createTestLobby(getFakeLobbyData());

      expect(lobby.toPlain().players.length).toEqual(1);
      lobby.join({ userId: FAKE_USER_ID });
      expect(lobby.toPlain().players.length).toEqual(2);
    });

    it("should throw when lobby is not opened", () => {
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus("GAME_INITIALIZING"),
      });

      expect(() => lobby.join({ userId: FAKE_USER_ID })).toThrow(
        LobbyStatusError,
      );
    });

    it("should throw when user is already in the lobby", () => {
      const lobby = createTestLobby(getFakeLobbyData());

      expect(() => lobby.join({ userId: getFakeHost().userId })).toThrow(
        LobbyError,
      );
    });

    it("should throw when lobby is full", () => {
      const fakeLobbyData = getFakeLobbyData();
      const lobby = createTestLobby({
        ...fakeLobbyData,
        config: {
          ...fakeLobbyData.config,
          nbPlayersMax: 2,
        },
        players: [
          ...fakeLobbyData.players,
          new User({
            userId: FAKE_USER_ID,
            status: new UserStatus(true),
          }),
        ],
      });

      expect(() => lobby.join({ userId: FAKE_USER_ID })).toThrow(LobbyError);
    });
  });

  describe("leave method", () => {
    it("should remove a ready user from the lobby and free its picked characters", () => {
      const hostUser = new User({
        userId: getFakeHost().userId,
        status: new UserStatus(true),
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        playableCharacters: [
          new PlayableCharacter({
            ...getFakeHero(),
            id: "00000000-0000-0000-0000-000000000011",
            pickedBy: hostUser.id,
          }),
          new PlayableCharacter({
            ...getFakeHero(),
            id: "00000000-0000-0000-0000-000000000012",
          }),
        ],
      });

      expect(lobby.toPlain().players.length).toEqual(1);
      expect(lobby.toPlain().playableCharacters[0]!.pickedBy).toEqual(
        hostUser.id,
      );

      lobby.leave({ user: hostUser });

      expect(lobby.toPlain().players.length).toEqual(0);
      expect(lobby.toPlain().playableCharacters[0]!.pickedBy).toBeUndefined();
    });
  });

  describe("gameInitializationStarted method", () => {
    it("should update the lobby status", () => {
      const hostUser = new User({
        userId: getFakeHost().userId,
        status: new UserStatus(true),
      });
      const invitedUser = new User({
        userId: FAKE_USER_ID,
        status: new UserStatus(true),
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        players: [hostUser, invitedUser],
        playableCharacters: [
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000111",
            type: "game_master",
            pickedBy: getFakeHost().userId,
          }),
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000222",
            type: "hero",
            pickedBy: invitedUser.id,
          }),
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000333",
            type: "hero",
            pickedBy: invitedUser.id,
          }),
        ],
      });

      lobby.gameInitializationStarted({ userId: hostUser.id });

      expect(lobby.toPlain().status).toEqual<LobbyStatus["current"]>(
        "GAME_INITIALIZING",
      );
    });

    it("should throw when lobby is not opened", () => {
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus("GAME_INITIALIZING"),
      });

      expect(() =>
        lobby.gameInitializationStarted({ userId: getFakeUserData().userId }),
      ).toThrow(LobbyStatusError);
    });

    it("should throw when action has not been requested by host", () => {
      const lobby = createTestLobby(getFakeLobbyData());

      expect(() =>
        lobby.gameInitializationStarted({ userId: FAKE_USER_ID }),
      ).toThrow(HostError);
    });

    it("should throw when some user are not ready", () => {
      const hostUser = new User({
        userId: getFakeHost().userId,
        status: new UserStatus(true),
      });
      const invitedUser = new User({
        userId: FAKE_USER_ID,
        status: new UserStatus(false),
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        players: [hostUser, invitedUser],
      });

      expect(() =>
        lobby.gameInitializationStarted({ userId: hostUser.id }),
      ).toThrow(UserStatusError);
    });

    it("should throw when some playable characters are not picked", () => {
      const hostUser = new User({
        userId: getFakeHost().userId,
        status: new UserStatus(true),
      });
      const invitedUser = new User({
        userId: FAKE_USER_ID,
        status: new UserStatus(true),
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        players: [hostUser, invitedUser],
        playableCharacters: [
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000111",
            type: "game_master",
            pickedBy: getFakeUserData().userId,
          }),
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000222",
            type: "hero",
            pickedBy: invitedUser.id,
          }),
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000333",
            type: "hero",
            pickedBy: undefined,
          }),
        ],
      });

      expect(() =>
        lobby.gameInitializationStarted({ userId: hostUser.id }),
      ).toThrow(PlayableCharacterError);
    });

    it("should throw game_master user also have picked hero", () => {
      const hostUser = new User({
        userId: getFakeHost().userId,
        status: new UserStatus(true),
      });
      const invitedUser = new User({
        userId: FAKE_USER_ID,
        status: new UserStatus(true),
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        players: [hostUser, invitedUser],
        playableCharacters: [
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000111",
            type: "game_master",
            pickedBy: getFakeUserData().userId,
          }),
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000222",
            type: "hero",
            pickedBy: getFakeUserData().userId,
          }),
          new PlayableCharacter({
            id: "00000000-0000-0000-0000-000000000333",
            type: "hero",
            pickedBy: invitedUser.id,
          }),
        ],
      });

      expect(() =>
        lobby.gameInitializationStarted({ userId: hostUser.id }),
      ).toThrow(PlayableCharacterError);
    });
  });

  describe("gameInitializationDone method", () => {
    it("should update the lobby status", () => {
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus("GAME_INITIALIZING"),
      });

      expect(lobby.toPlain().status).toEqual<LobbyStatus["current"]>(
        "GAME_INITIALIZING",
      );
      lobby.gameInitializationDone();
      expect(lobby.toPlain().status).toEqual<LobbyStatus["current"]>(
        "GAME_STARTED",
      );
    });
  });

  describe("pickPlayableCharacter method", () => {
    it("should give the playable character to the user", () => {
      const pc = new PlayableCharacter({
        id: FAKE_USER_ID,
        type: "hero",
        pickedBy: undefined,
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        playableCharacters: [pc],
      });

      expect(pc.pickedBy).toBeUndefined();
      lobby.pickPlayableCharacter({
        playableCharacterId: pc.id,
        userId: getFakeHost().userId,
      });
      expect(pc.pickedBy).toEqual(getFakeHost().userId);
    });

    it("should throw when the lobby is not opened", () => {
      const pc = new PlayableCharacter({
        id: FAKE_USER_ID,
        type: "hero",
        pickedBy: undefined,
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus("GAME_INITIALIZING"),
        playableCharacters: [pc],
      });

      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: pc.id,
          userId: getFakeHost().userId,
        }),
      ).toThrow(LobbyStatusError);
    });

    it("should throw when the user is not a player in this lobby", () => {
      const pc = new PlayableCharacter({
        id: FAKE_USER_ID,
        type: "hero",
        pickedBy: undefined,
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        playableCharacters: [pc],
      });

      expect(pc.pickedBy).toBeUndefined();
      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: pc.id,
          userId: FAKE_USER_ID,
        }),
      ).toThrow(Error);
    });

    it("should throw when the playable character does not exists", () => {
      const lobby = createTestLobby(getFakeLobbyData());

      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: FAKE_HERO_ID,
          userId: getFakeHost().userId,
        }),
      ).toThrow(Error);
    });

    it("should throw when the game_master try to pick a hero", () => {
      const pc = new PlayableCharacter({
        id: FAKE_USER_ID,
        type: "hero",
        pickedBy: undefined,
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        playableCharacters: [
          new PlayableCharacter({
            id: FAKE_HERO_ID,
            type: "game_master",
            pickedBy: getFakeHost().userId,
          }),
          pc,
        ],
      });

      expect(pc.pickedBy).toBeUndefined();
      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: pc.id,
          userId: getFakeHost().userId,
        }),
      ).toThrow(PlayableCharacterError);
    });

    it("should throw when a hero player try to pick the game_master", () => {
      const pc = new PlayableCharacter({
        id: FAKE_USER_ID,
        type: "game_master",
        pickedBy: undefined,
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        playableCharacters: [
          new PlayableCharacter({
            id: FAKE_HERO_ID,
            type: "hero",
            pickedBy: getFakeHost().userId,
          }),
          pc,
        ],
      });

      expect(pc.pickedBy).toBeUndefined();
      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: pc.id,
          userId: getFakeHost().userId,
        }),
      ).toThrow(PlayableCharacterError);
    });
  });

  describe("discardPlayableCharacter method", () => {
    it("should remove the character from the user", () => {
      const pc = new PlayableCharacter({
        id: FAKE_USER_ID,
        type: "hero",
        pickedBy: getFakeHost().userId,
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        playableCharacters: [pc],
      });

      expect(pc.pickedBy).toEqual(getFakeHost().userId);
      lobby.discardPlayableCharacter({
        playableCharacterId: pc.id,
        userId: getFakeHost().userId,
      });
      expect(pc.pickedBy).toBeUndefined();
    });

    it("should throw when the lobby is not opened", () => {
      const pc = new PlayableCharacter({
        id: FAKE_USER_ID,
        type: "hero",
        pickedBy: getFakeHost().userId,
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus("GAME_INITIALIZING"),
        playableCharacters: [pc],
      });

      expect(() =>
        lobby.discardPlayableCharacter({
          playableCharacterId: pc.id,
          userId: getFakeHost().userId,
        }),
      ).toThrow(LobbyStatusError);
    });

    it("should throw when the user is not a player in this lobby", () => {
      const pc = new PlayableCharacter({
        id: FAKE_USER_ID,
        type: "hero",
        pickedBy: getFakeHost().userId,
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        playableCharacters: [pc],
      });

      expect(pc.pickedBy).toEqual(getFakeHost().userId);
      expect(() =>
        lobby.discardPlayableCharacter({
          playableCharacterId: pc.id,
          userId: FAKE_USER_ID,
        }),
      ).toThrow(Error);
    });

    it("should throw when the playable character does not exists", () => {
      const lobby = createTestLobby(getFakeLobbyData());

      expect(() =>
        lobby.discardPlayableCharacter({
          playableCharacterId: FAKE_HERO_ID,
          userId: getFakeHost().userId,
        }),
      ).toThrow(Error);
    });
  });

  describe("toggleUserStatus method", () => {
    it("should toggle the user status", () => {
      const hostUser = new User({
        userId: getFakeHost().userId,
        status: new UserStatus(false),
      });
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        players: [hostUser],
      });

      expect(hostUser.status.isReady).toBe(false);
      lobby.toggleUserStatus({ userId: getFakeHost().userId });
      expect(hostUser.status.isReady).toBe(true);
    });

    it("should throw when the lobby is not opened", () => {
      const lobby = createTestLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus("GAME_INITIALIZING"),
      });

      expect(() =>
        lobby.toggleUserStatus({ userId: getFakeHost().userId }),
      ).toThrow(LobbyStatusError);
    });
  });
});
