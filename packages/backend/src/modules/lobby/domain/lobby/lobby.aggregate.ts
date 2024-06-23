import { LobbyView } from "@dnd/shared";
import { ConfigType } from "@nestjs/config";
import envConfig from "src/config/env.config";
import { AggregateRoot } from "src/modules/shared/domain/aggregate-root";
import { List } from "src/modules/shared/domain/list";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { Host } from "../host/host.entity";
import { LobbyStatus } from "../lobby-status/lobby-status.vo";
import { PlayableCharacter } from "../playable-character/playable-character.entity";
import { PlayableCharacterError } from "../playable-character/playable-character.error";
import { UserStatusError } from "../user-status/user-status.error";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "../user/user.entity";
import { LobbyError } from "./lobby.error";

type Data = Pick<LobbyView, "config"> & {
  id: UniqueId;
  players: List<User>;
  playableCharacters: List<PlayableCharacter>;
  host: Host;
  status: LobbyStatus;
};

export class Lobby extends AggregateRoot<Data> {
  constructor(
    private readonly env: Pick<ConfigType<typeof envConfig>, "NODE_ENV">,
    data: Data,
  ) {
    super(data, data.id);
  }

  public get config() {
    return this._data.config;
  }

  public get playableCharacters() {
    return this._data.playableCharacters;
  }

  public get host() {
    return this._data.host;
  }

  public get players() {
    return this._data.players;
  }

  public get status() {
    return this._data.status;
  }

  public join({ userId }: { userId: User["id"] }): void {
    this.status.mustBeOpened();
    this.mustHaveEnoughSpace();
    if (this.players.find({ id: userId })) {
      throw new LobbyError({
        name: "ALREADY_IN_LOBBY",
        message: "User is already in this lobby",
      });
    }

    const user = new User({ userId, status: new UserStatus(false) });

    this.players.add(user);
  }

  public leave({ user }: { user: User }): void {
    user.setNotReadyStatus();
    this.players.remove({ id: user.id });
    for (const playableCharacter of this.playableCharacters) {
      if (playableCharacter.pickedBy?.equals(user.id)) {
        playableCharacter.unsetOwner({ user });
      }
    }
  }

  private mustHaveEnoughSpace() {
    if (this.players.length >= this.config.nbPlayersMax) {
      throw new LobbyError({
        name: "PLAYERS_LIMIT_REACHED",
        message: "No space left in this lobby",
      });
    }
  }

  public gameInitializationStarted({ userId }: { userId: User["id"] }) {
    this.status.mustBeOpened();
    this.host.mustBeHost({ userId });

    if (this.players.values.some((player) => !player.status.isReady)) {
      throw new UserStatusError({
        name: "BAD_USER_STATUS",
        message: "Cannot initialize game creation (some players are not ready)",
      });
    }

    if (this.playableCharacters.values.some((pc) => !pc.pickedBy)) {
      throw new PlayableCharacterError({
        name: "PLAYABLE_CHARACTER_NOT_PICKED",
        message:
          "Cannot initialize game creation (some playable character are not picked)",
      });
    }

    if (this.env.NODE_ENV !== "development") {
      const gameMasterId = this.playableCharacters.values.find(
        (pc) => pc.type === "game_master",
      )!.pickedBy;
      if (
        this.playableCharacters.values.some(
          (pc) => pc.type === "hero" && pc.pickedBy?.equals(gameMasterId),
        )
      ) {
        throw new PlayableCharacterError({
          name: "BAD_USER_ROLE",
          message: "Game Master cannot control heroes",
        });
      }
    }

    this._data.status = this.status.advanceTo({ status: "GAME_INITIALIZING" });
  }

  public gameInitializationDone() {
    this._data.status = this.status.advanceTo({ status: "GAME_STARTED" });
  }

  public pickPlayableCharacter({
    playableCharacterId,
    userId,
  }: { playableCharacterId: PlayableCharacter["id"]; userId: User["id"] }) {
    this.status.mustBeOpened();

    const user = this.players.findOrThrow({ id: userId });
    const playableCharacter = this.playableCharacters.findOrThrow({
      id: playableCharacterId,
    });

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
    this.status.mustBeOpened();

    const user = this.players.findOrThrow({ id: userId });
    const playableCharacter = this.playableCharacters.findOrThrow({
      id: playableCharacterId,
    });

    playableCharacter.unsetOwner({ user });
  }

  private mustNotBeGameMaster({ user }: { user: User }) {
    const isGameMaster = this.playableCharacters.values.some(
      (playableCharacter) =>
        playableCharacter.type === "game_master" &&
        playableCharacter.pickedBy?.equals(user.id),
    );
    if (isGameMaster) {
      throw new PlayableCharacterError({
        name: "BAD_USER_ROLE",
        message: "Cannot endorse Game Master role while being Player",
      });
    }
  }

  private mustNotBeHero({ user }: { user: User }) {
    const isHero = this.playableCharacters.values.some(
      (playableCharacter) =>
        playableCharacter.type === "hero" &&
        playableCharacter.pickedBy?.equals(user.id),
    );
    if (isHero) {
      throw new PlayableCharacterError({
        name: "BAD_USER_ROLE",
        message: "Cannot endorse Player role while being Game Master",
      });
    }
  }

  public toggleUserStatus({ userId }: { userId: User["id"] }) {
    this.status.mustBeOpened();

    const user = this.players.findOrThrow({ id: userId });
    user.toggleStatus();
  }
}
