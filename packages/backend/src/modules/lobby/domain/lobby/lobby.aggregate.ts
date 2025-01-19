import { LobbyView, lobbySchema } from "@dnd/shared";
import { ConfigType } from "@nestjs/config";
import envConfig from "src/config/env.config";
import { AggregateRoot } from "src/modules/shared/domain/aggregate-root";
import { z } from "zod";
import { Host } from "../host/host.entity";
import { LobbyStatus } from "../lobby-status/lobby-status.vo";
import { PlayableCharacter } from "../playable-character/playable-character.entity";
import { PlayableCharacterError } from "../playable-character/playable-character.error";
import { UserStatusError } from "../user-status/user-status.error";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "../user/user.entity";
import { LobbyError } from "./lobby.error";

type Data = Pick<LobbyView, "config"> & {
  id: string;
  players: Array<User>;
  playableCharacters: Array<PlayableCharacter>;
  host: Host;
  status: LobbyStatus;
};

export class Lobby extends AggregateRoot<Data> {
  private static schema = lobbySchema.merge(
    z.object({
      id: z.string().uuid(),
      players: z.array(z.instanceof(User)),
      playableCharacters: z.array(z.instanceof(PlayableCharacter)),
      host: z.instanceof(Host),
      status: z.instanceof(LobbyStatus),
    }),
  );

  constructor(
    private readonly env: Pick<ConfigType<typeof envConfig>, "NODE_ENV">,
    rawData: Data,
  ) {
    const data = Lobby.schema.parse(rawData);
    super(data, data.id);
  }

  public override toPlain() {
    return {
      config: this._data.config,
      host: this._data.host.toPlain(),
      id: this._data.id,
      playableCharacters: this._data.playableCharacters.map((pc) =>
        pc.toPlain(),
      ),
      players: this._data.players.map((player) => player.toPlain()),
      status: this._data.status.toPlain(),
    };
  }

  public join({ userId }: { userId: User["id"] }): void {
    this._data.status.mustBeOpened();
    this.mustHaveEnoughSpace();
    if (this._data.players.find(({ id }) => id === userId)) {
      throw new LobbyError({
        name: "ALREADY_IN_LOBBY",
        message: "User is already in this lobby",
      });
    }

    const user = new User({ userId, status: new UserStatus(false) });

    this._data.players.push(user);
  }

  public leave({ user }: { user: User }): void {
    user.setNotReadyStatus();
    this._data.players = this._data.players.filter(({ id }) => id !== user.id);
    for (const playableCharacter of this._data.playableCharacters) {
      if (playableCharacter.pickedBy === user.id) {
        playableCharacter.unsetOwner({ user });
      }
    }
  }

  private mustHaveEnoughSpace() {
    if (this._data.players.length >= this._data.config.nbPlayersMax) {
      throw new LobbyError({
        name: "PLAYERS_LIMIT_REACHED",
        message: "No space left in this lobby",
      });
    }
  }

  public gameInitializationStarted({ userId }: { userId: User["id"] }) {
    this._data.status.mustBeOpened();
    this._data.host.mustBeHost({ userId });

    if (this._data.players.some((player) => !player.status.isReady)) {
      throw new UserStatusError({
        name: "BAD_USER_STATUS",
        message: "Cannot initialize game creation (some players are not ready)",
      });
    }

    if (this._data.playableCharacters.some((pc) => !pc.pickedBy)) {
      throw new PlayableCharacterError({
        name: "PLAYABLE_CHARACTER_NOT_PICKED",
        message:
          "Cannot initialize game creation (some playable character are not picked)",
      });
    }

    if (this.env.NODE_ENV !== "development") {
      const gameMasterId = this._data.playableCharacters.find(
        (pc) => pc.type === "game_master",
      )!.pickedBy;
      if (
        this._data.playableCharacters.some(
          (pc) => pc.type === "hero" && pc.pickedBy === gameMasterId,
        )
      ) {
        throw new PlayableCharacterError({
          name: "BAD_USER_ROLE",
          message: "Game Master cannot control heroes",
        });
      }
    }

    this._data.status = this._data.status.advanceTo("GAME_INITIALIZING");
  }

  public gameInitializationDone() {
    this._data.status = this._data.status.advanceTo("GAME_STARTED");
  }

  public pickPlayableCharacter({
    playableCharacterId,
    userId,
  }: { playableCharacterId: PlayableCharacter["id"]; userId: User["id"] }) {
    this._data.status.mustBeOpened();

    const user = this._data.players.find(({ id }) => id === userId);
    if (!user) {
      throw new LobbyError({
        name: "PLAYER_NOT_FOUND",
        message: "Player not found in this lobby",
      });
    }
    const playableCharacter = this._data.playableCharacters.find(
      ({ id }) => id === playableCharacterId,
    );
    if (!playableCharacter) {
      throw new LobbyError({
        name: "PLAYABLE_CHARACTER_NOT_FOUND",
        message: "Playable Character not found in this lobby",
      });
    }

    if (this.env.NODE_ENV !== "development") {
      if (playableCharacter.type === "hero") {
        this.mustNotBeGameMaster({ user });
      } else {
        this.mustNotBeHero({ user });
      }
    }

    playableCharacter.setOwner({ user });
  }

  public discardPlayableCharacter({
    playableCharacterId,
    userId,
  }: { playableCharacterId: PlayableCharacter["id"]; userId: User["id"] }) {
    this._data.status.mustBeOpened();

    const user = this._data.players.find(({ id }) => id === userId);
    if (!user) {
      throw new LobbyError({
        name: "PLAYER_NOT_FOUND",
        message: "Player not found in this lobby",
      });
    }
    const playableCharacter = this._data.playableCharacters.find(
      ({ id }) => id === playableCharacterId,
    );
    if (!playableCharacter) {
      throw new LobbyError({
        name: "PLAYABLE_CHARACTER_NOT_FOUND",
        message: "Playable Character not found in this lobby",
      });
    }

    playableCharacter.unsetOwner({ user });
  }

  private mustNotBeGameMaster({ user }: { user: User }) {
    const isGameMaster = this._data.playableCharacters.some(
      (playableCharacter) =>
        playableCharacter.type === "game_master" &&
        playableCharacter.pickedBy === user.id,
    );
    if (isGameMaster) {
      throw new PlayableCharacterError({
        name: "BAD_USER_ROLE",
        message: "Cannot endorse Game Master role while being Player",
      });
    }
  }

  private mustNotBeHero({ user }: { user: User }) {
    const isHero = this._data.playableCharacters.some(
      (playableCharacter) =>
        playableCharacter.type === "hero" &&
        playableCharacter.pickedBy === user.id,
    );
    if (isHero) {
      throw new PlayableCharacterError({
        name: "BAD_USER_ROLE",
        message: "Cannot endorse Player role while being Game Master",
      });
    }
  }

  public toggleUserStatus({ userId }: { userId: User["id"] }) {
    this._data.status.mustBeOpened();

    const user = this._data.players.find(({ id }) => id === userId);
    if (!user) {
      throw new LobbyError({
        name: "PLAYER_NOT_FOUND",
        message: "Player not found in this lobby",
      });
    }

    user.toggleStatus();
  }

  public findUser({ userId }: { userId: User["id"] }) {
    return this._data.players.find((player) => player.id === userId);
  }
}
