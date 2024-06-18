import { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { List } from "src/modules/shared/domain/list";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Host } from "../../../domain/host/host.entity";
import { LobbyStatus } from "../../../domain/lobby-status/lobby-status.vo";
import { Lobby as LobbyDomain } from "../../../domain/lobby/lobby.aggregate";
import { PlayableCharacter } from "../../../domain/playable-character/playable-character.entity";
import { UserStatus } from "../../../domain/user-status/user-status.vo";
import { User } from "../../../domain/user/user.entity";
import { LobbyPersistence } from "../../database/lobbies/lobby.model";

@Injectable()
export class LobbiesMapper extends Mapper<
  LobbyPersistence,
  LobbyDomain,
  LobbyEntity
> {
  public toDomain(persistence: LobbyPersistence): LobbyDomain {
    return new LobbyDomain({
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

  public toPersistence(domain: LobbyDomain): LobbyPersistence {
    return {
      config: domain.config,
      playableCharacters: domain.playableCharacters.values.map(
        ({ id, type, pickedBy }) =>
          ({
            id: id.id,
            type,
            pickedBy: pickedBy ? pickedBy.id : undefined,
            // TODO: il manque les metadata. Mais c'est normal quand on vient du domain
          }) as LobbyPersistence["playableCharacters"][number],
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

  public toView(persistence: LobbyPersistence): LobbyEntity {
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
    player: LobbyPersistence["players"][number];
    persistenceLobby: LobbyPersistence;
  }): LobbyEntity["players"][number]["heroesSelected"] {
    return persistenceLobby.playableCharacters
      .filter((hero) => hero.pickedBy === player.userId)
      .map((hero) => hero.id);
  }
}
