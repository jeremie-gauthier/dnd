import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import envConfig from "src/config/env.config";
import { PlayableCharacter as PlayableCharacterDomain } from "src/modules/lobby/domain/playable-character/playable-character.entity";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Repository } from "typeorm";
import { Host } from "../../../domain/host/host.entity";
import { LobbyStatus } from "../../../domain/lobby-status/lobby-status.vo";
import { Lobby as LobbyDomain } from "../../../domain/lobby/lobby.aggregate";
import { UserStatus } from "../../../domain/user-status/user-status.vo";
import { User } from "../../../domain/user/user.entity";
import { Lobby as LobbyPersistence } from "../entities/lobby.entity";
import { PlayableCharacter as PlayableCharacterPersistence } from "../entities/playable-character.entity";

@Injectable()
export class LobbyMapper extends Mapper<LobbyPersistence, LobbyDomain> {
  constructor(
    @Inject(envConfig.KEY)
    private readonly env: ConfigType<typeof envConfig>,
    @InjectRepository(LobbyPersistence)
    private readonly lobbyRepository: Repository<LobbyPersistence>,
    @InjectRepository(PlayableCharacterPersistence)
    private readonly playableCharacterRepository: Repository<PlayableCharacterPersistence>,
  ) {
    super();
  }

  public override toDomain(persistence: LobbyPersistence): LobbyDomain {
    return new LobbyDomain(this.env, {
      config: persistence.config,
      playableCharacters: persistence.playableCharacters.map(
        ({ id, type, pickedBy }) =>
          new PlayableCharacterDomain({ id, type, pickedBy: pickedBy?.userId }),
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
    return this.lobbyRepository.create({
      config: plainLobby.config,
      host: plainLobby.host,
      id: plainLobby.id,
      playableCharacters: plainLobby.playableCharacters.map((pc) =>
        this.playableCharacterRepository.create({
          id: pc.id,
          type: pc.type,
          pickedBy: { userId: pc.pickedBy },
        }),
      ),
      status: plainLobby.status,
      players: plainLobby.players.map((player) => ({
        isReady: player.status,
        userId: player.userId,
      })),
    });
  }
}
