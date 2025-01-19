import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import envConfig from "src/config/env.config";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Host } from "../../../domain/host/host.entity";
import { LobbyStatus } from "../../../domain/lobby-status/lobby-status.vo";
import { Lobby as LobbyDomain } from "../../../domain/lobby/lobby.aggregate";
import { PlayableCharacter } from "../../../domain/playable-character/playable-character.entity";
import { UserStatus } from "../../../domain/user-status/user-status.vo";
import { User } from "../../../domain/user/user.entity";
import { LobbyPersistence } from "../../database/lobbies/lobby.model";

@Injectable()
export class LobbiesMapper extends Mapper<LobbyPersistence, LobbyDomain> {
  constructor(
    @Inject(envConfig.KEY)
    private readonly env: ConfigType<typeof envConfig>,
  ) {
    super();
  }

  public override toDomain(persistence: LobbyPersistence): LobbyDomain {
    return new LobbyDomain(this.env, {
      config: persistence.config,
      playableCharacters: persistence.playableCharacters.map(
        ({ id, type, pickedBy }) =>
          new PlayableCharacter({ id, type, pickedBy }),
      ),
      host: new Host({ userId: persistence.host.userId }),
      id: persistence.id,
      players: persistence.players.map(
        (player) =>
          new User({
            status: new UserStatus(player.isReady),
            userId: player.userId,
          }),
      ),
      status: new LobbyStatus(persistence.status),
    });
  }

  public toPersistence(domain: LobbyDomain): LobbyPersistence {
    const plainLobby = domain.toPlain();
    return {
      ...plainLobby,
      players: plainLobby.players.map((player) => ({
        isReady: player.status,
        userId: player.userId,
      })),
    };
  }
}
