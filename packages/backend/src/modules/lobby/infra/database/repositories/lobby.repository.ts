import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LobbyRepository } from "../../../application/repositories/lobbies-repository.interface";
import { Lobby as LobbyDomain } from "../../../domain/lobby/lobby.aggregate";
import { Config } from "../entities/config.entity";
import { Host } from "../entities/host.entity";
import { Lobby as LobbyPersistence } from "../entities/lobby.entity";
import { LobbyStatus } from "../enums/lobby.enum";
import { LobbyMapper } from "../mappers/lobby.mapper";

@Injectable()
export class LobbiesPostgresRepository implements LobbyRepository {
  constructor(
    @InjectRepository(LobbyPersistence)
    private readonly lobbyRepository: Repository<LobbyPersistence>,
    private readonly lobbyMapper: LobbyMapper,
  ) {}

  public async create({
    config,
    hostUserId,
  }: {
    config: Config;
    hostUserId: Host["userId"];
  }): Promise<LobbyDomain> {
    const lobby = await this.lobbyRepository.save({
      host: {
        userId: hostUserId,
      },
      config,
      // TODO: must be fetched now according to the config campaignStageId
      playableCharacters: [],
      players: [
        {
          isReady: false,
          playableCharacters: [],
          userId: hostUserId,
        },
      ],
      status: LobbyStatus.OPENED,
    });
    return this.lobbyMapper.toDomain(lobby);
  }

  public async getOne({
    lobbyId,
  }: { lobbyId: LobbyDomain["id"] }): Promise<LobbyDomain | null> {
    const lobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
    });
    return lobby ? this.lobbyMapper.toDomain(lobby) : null;
  }

  public async getOneOrThrow({
    lobbyId,
  }: { lobbyId: LobbyDomain["id"] }): Promise<LobbyDomain> {
    const lobby = await this.getOne({ lobbyId });
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }
    return lobby;
  }

  public async getUserLobby({
    userId,
  }: {
    userId: string;
  }): Promise<LobbyDomain | null> {
    const lobby = await this.lobbyRepository.findOne({
      where: { players: { userId } },
    });

    return lobby ? this.lobbyMapper.toDomain(lobby) : null;
  }

  public async getMany(): Promise<LobbyDomain[]> {
    const lobbies = await this.lobbyRepository.find();
    return lobbies.map((lobby) => this.lobbyMapper.toDomain(lobby));
  }

  public async update({ lobby }: { lobby: LobbyDomain }): Promise<void> {
    const persistence = this.lobbyMapper.toPersistence(lobby);

    await this.lobbyRepository.save(persistence);

    // TODO: rebrancher ce emitter ailleurs
    // const plainLobby = lobby.toPlain();
    // this.eventEmitter.emitAsync(
    //   LobbyEvent.LobbyUpdated,
    //   new LobbyUpdatedPayload({
    //     lobby: {
    //       ...plainLobby,
    //       players: plainLobby.players.map(({ status, ...player }) => ({
    //         ...player,
    //         isReady: status,
    //         heroesSelected: plainLobby.playableCharacters
    //           .filter((pc) => pc.pickedBy === player.userId)
    //           .map((pc) => pc.id),
    //       })),
    //       status: plainLobby.status,
    //     },
    //   }),
    // );
  }

  public async del({ lobbyId }: { lobbyId: LobbyDomain["id"] }): Promise<void> {
    await this.lobbyRepository.delete({ id: lobbyId });
  }
}
