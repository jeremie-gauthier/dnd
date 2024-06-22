import { List } from "src/modules/shared/domain/list";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { describe, expect, it } from "vitest";
import { HostError } from "../host/host.error";
import { FAKE_HOST } from "../host/host.fixtures";
import { LobbyStatusError } from "../lobby-status/lobby-status.error";
import { LobbyStatus } from "../lobby-status/lobby-status.vo";
import { PlayableCharacter } from "../playable-character/playable-character.entity";
import { PlayableCharacterError } from "../playable-character/playable-character.error";
import { FAKE_HERO } from "../playable-character/playable-character.fixtures";
import { UserStatusError } from "../user-status/user-status.error";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "../user/user.entity";
import { FAKE_USER } from "../user/user.fixtures";
import { Lobby } from "./lobby.aggregate";
import { LobbyError } from "./lobby.error";
import { FAKE_LOBBY_ID, getFakeLobbyData } from "./lobby.fixtures";

describe("Lobby Aggregate", () => {
  const createLobby = (data: ReturnType<typeof getFakeLobbyData>) =>
    new Lobby({ NODE_ENV: "test" }, data);

  describe("constructor", () => {
    it("should create a LobbyAggregate and access its data", () => {
      const lobby = createLobby(getFakeLobbyData());

      expect(lobby.id).toEqual(new UniqueId(FAKE_LOBBY_ID));
      expect(lobby.config).toEqual(getFakeLobbyData().config);
    });
  });

  describe("join method", () => {
    it("should add a user in the lobby", () => {
      const lobby = createLobby(getFakeLobbyData());

      expect(lobby.players.length).toEqual(1);
      lobby.join({ userId: new UniqueId() });
      expect(lobby.players.length).toEqual(2);
    });

    it("should throw when lobby is not opened", () => {
      const lobby = createLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus({ status: "GAME_INITIALIZING" }),
      });

      expect(() => lobby.join({ userId: new UniqueId() })).toThrow(
        LobbyStatusError,
      );
    });

    it("should throw when user is already in the lobby", () => {
      const lobby = createLobby(getFakeLobbyData());

      expect(() => lobby.join({ userId: FAKE_HOST.userId })).toThrow(
        LobbyError,
      );
    });

    it("should throw when lobby is full", () => {
      const fakeLobbyData = getFakeLobbyData();
      const lobby = createLobby({
        ...fakeLobbyData,
        config: {
          ...fakeLobbyData.config,
          nbPlayersMax: 2,
        },
        players: new List([
          ...fakeLobbyData.players.values,
          new User({
            userId: new UniqueId(),
            status: new UserStatus(true),
          }),
        ]),
      });

      expect(() => lobby.join({ userId: new UniqueId() })).toThrow(LobbyError);
    });
  });

  describe("leave method", () => {
    it("should remove a ready user from the lobby and free its picked characters", () => {
      const hostUser = new User({
        userId: FAKE_HOST.userId,
        status: new UserStatus(true),
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        playableCharacters: new List([
          new PlayableCharacter({
            ...FAKE_HERO,
            id: new UniqueId("00000000-0000-0000-0000-000000000011"),
            pickedBy: hostUser.id,
          }),
          new PlayableCharacter({
            ...FAKE_HERO,
            id: new UniqueId("00000000-0000-0000-0000-000000000012"),
          }),
        ]),
      });

      expect(lobby.players.length).toEqual(1);
      expect(
        lobby.playableCharacters.values[0]!.pickedBy!.equals(hostUser.id),
      ).toBe(true);

      lobby.leave({ user: hostUser });

      expect(lobby.players.length).toEqual(0);
      expect(lobby.playableCharacters.values[0]!.pickedBy).toBeUndefined();
    });
  });

  describe("gameInitializationStarted method", () => {
    it("should update the lobby status", () => {
      const hostUser = new User({
        userId: FAKE_HOST.userId,
        status: new UserStatus(true),
      });
      const invitedUser = new User({
        userId: new UniqueId(),
        status: new UserStatus(true),
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        players: new List([hostUser, invitedUser]),
        playableCharacters: new List([
          new PlayableCharacter({
            id: new UniqueId(),
            type: "game_master",
            pickedBy: FAKE_USER.userId,
          }),
          new PlayableCharacter({
            id: new UniqueId(),
            type: "hero",
            pickedBy: invitedUser.id,
          }),
          new PlayableCharacter({
            id: new UniqueId(),
            type: "hero",
            pickedBy: invitedUser.id,
          }),
        ]),
      });

      lobby.gameInitializationStarted({ userId: hostUser.id });

      expect(lobby.status.current).toEqual<LobbyStatus["current"]>(
        "GAME_INITIALIZING",
      );
    });

    it("should throw when lobby is not opened", () => {
      const lobby = createLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus({ status: "GAME_INITIALIZING" }),
      });

      expect(() =>
        lobby.gameInitializationStarted({ userId: FAKE_USER.userId }),
      ).toThrow(LobbyStatusError);
    });

    it("should throw when action has not been requested by host", () => {
      const lobby = createLobby(getFakeLobbyData());

      expect(() =>
        lobby.gameInitializationStarted({ userId: new UniqueId() }),
      ).toThrow(HostError);
    });

    it("should throw when some user are not ready", () => {
      const hostUser = new User({
        userId: FAKE_HOST.userId,
        status: new UserStatus(true),
      });
      const invitedUser = new User({
        userId: new UniqueId(),
        status: new UserStatus(false),
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        players: new List([hostUser, invitedUser]),
      });

      expect(() =>
        lobby.gameInitializationStarted({ userId: hostUser.id }),
      ).toThrow(UserStatusError);
    });

    it("should throw when some playable characters are not picked", () => {
      const hostUser = new User({
        userId: FAKE_HOST.userId,
        status: new UserStatus(true),
      });
      const invitedUser = new User({
        userId: new UniqueId(),
        status: new UserStatus(true),
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        players: new List([hostUser, invitedUser]),
        playableCharacters: new List([
          new PlayableCharacter({
            id: new UniqueId(),
            type: "game_master",
            pickedBy: FAKE_USER.userId,
          }),
          new PlayableCharacter({
            id: new UniqueId(),
            type: "hero",
            pickedBy: invitedUser.id,
          }),
          new PlayableCharacter({
            id: new UniqueId(),
            type: "hero",
            pickedBy: undefined,
          }),
        ]),
      });

      expect(() =>
        lobby.gameInitializationStarted({ userId: hostUser.id }),
      ).toThrow(PlayableCharacterError);
    });

    it("should throw game_master user also have picked hero", () => {
      const hostUser = new User({
        userId: FAKE_HOST.userId,
        status: new UserStatus(true),
      });
      const invitedUser = new User({
        userId: new UniqueId(),
        status: new UserStatus(true),
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        players: new List([hostUser, invitedUser]),
        playableCharacters: new List([
          new PlayableCharacter({
            id: new UniqueId(),
            type: "game_master",
            pickedBy: FAKE_USER.userId,
          }),
          new PlayableCharacter({
            id: new UniqueId(),
            type: "hero",
            pickedBy: FAKE_USER.userId,
          }),
          new PlayableCharacter({
            id: new UniqueId(),
            type: "hero",
            pickedBy: invitedUser.id,
          }),
        ]),
      });

      expect(() =>
        lobby.gameInitializationStarted({ userId: hostUser.id }),
      ).toThrow(PlayableCharacterError);
    });
  });

  describe("gameInitializationDone method", () => {
    it("should update the lobby status", () => {
      const lobby = createLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus({ status: "GAME_INITIALIZING" }),
      });

      expect(lobby.status.current).toEqual<LobbyStatus["current"]>(
        "GAME_INITIALIZING",
      );
      lobby.gameInitializationDone();
      expect(lobby.status.current).toEqual<LobbyStatus["current"]>(
        "GAME_STARTED",
      );
    });
  });

  describe("pickPlayableCharacter method", () => {
    it("should give the playable character to the user", () => {
      const pc = new PlayableCharacter({
        id: new UniqueId(),
        type: "hero",
        pickedBy: undefined,
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        playableCharacters: new List([pc]),
      });

      expect(pc.pickedBy).toBeUndefined();
      lobby.pickPlayableCharacter({
        playableCharacterId: pc.id,
        userId: FAKE_HOST.userId,
      });
      expect(pc.pickedBy!.equals(FAKE_HOST.userId)).toBe(true);
    });

    it("should throw when the lobby is not opened", () => {
      const pc = new PlayableCharacter({
        id: new UniqueId(),
        type: "hero",
        pickedBy: undefined,
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus({ status: "GAME_INITIALIZING" }),
        playableCharacters: new List([pc]),
      });

      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: pc.id,
          userId: FAKE_HOST.userId,
        }),
      ).toThrow(LobbyStatusError);
    });

    it("should throw when the user is not a player in this lobby", () => {
      const pc = new PlayableCharacter({
        id: new UniqueId(),
        type: "hero",
        pickedBy: undefined,
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        playableCharacters: new List([pc]),
      });

      expect(pc.pickedBy).toBeUndefined();
      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: pc.id,
          userId: new UniqueId(),
        }),
      ).toThrow(Error);
    });

    it("should throw when the playable character does not exists", () => {
      const lobby = createLobby(getFakeLobbyData());

      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: new UniqueId(),
          userId: FAKE_HOST.userId,
        }),
      ).toThrow(Error);
    });

    it("should throw when the game_master try to pick a hero", () => {
      const pc = new PlayableCharacter({
        id: new UniqueId(),
        type: "hero",
        pickedBy: undefined,
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        playableCharacters: new List([
          new PlayableCharacter({
            id: new UniqueId(),
            type: "game_master",
            pickedBy: FAKE_HOST.userId,
          }),
          pc,
        ]),
      });

      expect(pc.pickedBy).toBeUndefined();
      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: pc.id,
          userId: FAKE_HOST.userId,
        }),
      ).toThrow(PlayableCharacterError);
    });

    it("should throw when a hero player try to pick the game_master", () => {
      const pc = new PlayableCharacter({
        id: new UniqueId(),
        type: "game_master",
        pickedBy: undefined,
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        playableCharacters: new List([
          new PlayableCharacter({
            id: new UniqueId(),
            type: "hero",
            pickedBy: FAKE_HOST.userId,
          }),
          pc,
        ]),
      });

      expect(pc.pickedBy).toBeUndefined();
      expect(() =>
        lobby.pickPlayableCharacter({
          playableCharacterId: pc.id,
          userId: FAKE_HOST.userId,
        }),
      ).toThrow(PlayableCharacterError);
    });
  });

  describe("discardPlayableCharacter method", () => {
    it("should remove the character from the user", () => {
      const pc = new PlayableCharacter({
        id: new UniqueId(),
        type: "hero",
        pickedBy: FAKE_HOST.userId,
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        playableCharacters: new List([pc]),
      });

      expect(pc.pickedBy!.equals(FAKE_HOST.userId)).toBe(true);
      lobby.discardPlayableCharacter({
        playableCharacterId: pc.id,
        userId: FAKE_HOST.userId,
      });
      expect(pc.pickedBy).toBeUndefined();
    });

    it("should throw when the lobby is not opened", () => {
      const pc = new PlayableCharacter({
        id: new UniqueId(),
        type: "hero",
        pickedBy: FAKE_HOST.userId,
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus({ status: "GAME_INITIALIZING" }),
        playableCharacters: new List([pc]),
      });

      expect(() =>
        lobby.discardPlayableCharacter({
          playableCharacterId: pc.id,
          userId: FAKE_HOST.userId,
        }),
      ).toThrow(LobbyStatusError);
    });

    it("should throw when the user is not a player in this lobby", () => {
      const pc = new PlayableCharacter({
        id: new UniqueId(),
        type: "hero",
        pickedBy: FAKE_HOST.userId,
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        playableCharacters: new List([pc]),
      });

      expect(pc.pickedBy!.equals(FAKE_HOST.userId)).toBe(true);
      expect(() =>
        lobby.discardPlayableCharacter({
          playableCharacterId: pc.id,
          userId: new UniqueId(),
        }),
      ).toThrow(Error);
    });

    it("should throw when the playable character does not exists", () => {
      const lobby = createLobby(getFakeLobbyData());

      expect(() =>
        lobby.discardPlayableCharacter({
          playableCharacterId: new UniqueId(),
          userId: FAKE_HOST.userId,
        }),
      ).toThrow(Error);
    });
  });

  describe("toggleUserStatus method", () => {
    it("should toggle the user status", () => {
      const hostUser = new User({
        userId: FAKE_HOST.userId,
        status: new UserStatus(false),
      });
      const lobby = createLobby({
        ...getFakeLobbyData(),
        players: new List([hostUser]),
      });

      expect(hostUser.status.isReady).toBe(false);
      lobby.toggleUserStatus({ userId: FAKE_HOST.userId });
      expect(hostUser.status.isReady).toBe(true);
    });

    it("should throw when the lobby is not opened", () => {
      const lobby = createLobby({
        ...getFakeLobbyData(),
        status: new LobbyStatus({ status: "GAME_INITIALIZING" }),
      });

      expect(() =>
        lobby.toggleUserStatus({ userId: FAKE_HOST.userId }),
      ).toThrow(LobbyStatusError);
    });
  });
});
