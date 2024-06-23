import { LobbyView } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import envConfig from "src/config/env.config";
import { List } from "src/modules/shared/domain/list";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Host } from "../../../domain/host/host.entity";
import { LobbyStatus } from "../../../domain/lobby-status/lobby-status.vo";
import { Lobby as LobbyDomain } from "../../../domain/lobby/lobby.aggregate";
import { PlayableCharacter } from "../../../domain/playable-character/playable-character.entity";
import { UserStatus } from "../../../domain/user-status/user-status.vo";
import { User } from "../../../domain/user/user.entity";
import { ILobbyPersistence } from "./lobby.model";

@Injectable()
export class LobbiesMapper extends Mapper<
  ILobbyPersistence,
  LobbyDomain,
  LobbyView
> {
  constructor(
    @Inject(envConfig.KEY)
    private readonly env: ConfigType<typeof envConfig>,
  ) {
    super();
  }

  public toDomain(persistence: ILobbyPersistence): LobbyDomain {
    return new LobbyDomain(this.env, {
      config: persistence.config,
      playableCharacters: new List(
        persistence.playableCharacters.map(
          ({ id, type, pickedBy }) =>
            new PlayableCharacter({
              id: new UniqueId(id),
              type,
              pickedBy: pickedBy ? new UniqueId(pickedBy) : undefined,
            }),
        ),
      ),
      host: new Host({ userId: new UniqueId(persistence.host.userId) }),
      id: new UniqueId(persistence.id),
      players: new List(
        persistence.players.map(
          (player) =>
            new User({
              status: new UserStatus(player.isReady),
              userId: new UniqueId(player.userId),
            }),
        ),
      ),
      status: new LobbyStatus({ status: persistence.status }),
    });
  }

  public toPersistence(domain: LobbyDomain): ILobbyPersistence {
    return {
      config: domain.config,
      playableCharacters: domain.playableCharacters.values.map(
        ({ id, type, pickedBy }) => ({
          id: id.id,
          type,
          pickedBy: pickedBy ? pickedBy.id : undefined,
        }),
      ),
      host: {
        userId: domain.host.id.id,
      },
      id: domain.id.id,
      players: domain.players.values.map((player) => ({
        isReady: player.status.isReady,
        userId: player.id.id,
      })),
      status: domain.status.current,
    };
  }

  public toView(persistence: ILobbyPersistence): LobbyView {
    return {
      config: persistence.config,
      host: persistence.host,
      id: persistence.id,
      playableCharacters: persistence.playableCharacters,
      players: persistence.players.map((player) => ({
        ...player,
        heroesSelected: this.getPlayerHeroesSelected({
          player,
          persistenceLobby: persistence,
        }),
      })),
      status: persistence.status,
    };
  }

  private getPlayerHeroesSelected({
    player,
    persistenceLobby,
  }: {
    player: ILobbyPersistence["players"][number];
    persistenceLobby: ILobbyPersistence;
  }): LobbyView["players"][number]["heroesSelected"] {
    return persistenceLobby.playableCharacters
      .filter((hero) => hero.pickedBy === player.userId)
      .map((hero) => hero.id);
  }
}
