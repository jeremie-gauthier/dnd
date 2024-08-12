import { randomUUID } from "node:crypto";
import type { LobbyView } from "@dnd/shared";
import {
  Injectable,
  NotFoundException,
  type OnApplicationBootstrap,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { LobbyUpdatedPayload } from "src/modules/shared/events/lobby/lobby-changed.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { RedisService } from "../../../../../redis/redis.service";
import { LobbiesRepository } from "../../../application/repositories/lobbies-repository.interface";
import { Lobby } from "../../../domain/lobby/lobby.aggregate";
import { LobbiesMapper } from "./lobbies.mapper";
import { LobbyPersistence } from "./lobby.model";

type LobbiesKey = Record<LobbyPersistence["id"], LobbyPersistence>;

@Injectable()
export class RedisLobbiesRepository
  implements OnApplicationBootstrap, LobbiesRepository
{
  private readonly client;
  private static readonly KEY = "lobbies";

  constructor(
    private readonly mapper: LobbiesMapper,
    protected readonly eventEmitter: EventEmitter2,
    redisService: RedisService,
  ) {
    this.client = redisService.client;
  }

  public async onApplicationBootstrap() {
    const lobbies = await this.client.json.get(RedisLobbiesRepository.KEY);
    if (lobbies === null) {
      await this.client.json.set(
        RedisLobbiesRepository.KEY,
        RedisService.JSON_ROOT,
        {},
      );
    }
  }

  public async create({
    config,
    heroes,
    hostUserId,
  }: {
    config: LobbyView["config"];
    heroes: Array<Hero>;
    hostUserId: User["id"];
  }): Promise<Lobby> {
    const lobby: LobbyPersistence = {
      id: randomUUID(),
      config,
      playableCharacters: [
        { id: randomUUID(), type: "game_master" as const },
        ...heroes.map(({ id, ...metadata }) => ({
          id,
          type: "hero" as const,
          metadata,
        })),
      ],
      host: {
        userId: hostUserId,
      },
      players: [{ isReady: false, userId: hostUserId }],
      status: "OPENED",
    };
    await this.client.json.set(RedisLobbiesRepository.KEY, lobby.id, lobby);
    return this.mapper.toDomain(lobby);
  }

  public async getOne({
    lobbyId,
  }: { lobbyId: Lobby["id"] }): Promise<Lobby | null> {
    const lobbyRaw = (await this.client.json.get(RedisLobbiesRepository.KEY, {
      path: lobbyId,
    })) as LobbyPersistence | null;
    return lobbyRaw ? this.mapper.toDomain(lobbyRaw) : null;
  }

  public async getOneOrThrow({
    lobbyId,
  }: { lobbyId: Lobby["id"] }): Promise<Lobby> {
    const lobby = await this.getOne({ lobbyId });
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }
    return lobby;
  }

  public async getMany(): Promise<Lobby[]> {
    const lobbiesRaw = (await this.client.json.get(
      RedisLobbiesRepository.KEY,
    )) as LobbiesKey;
    return Object.values(lobbiesRaw).map((lobbyRaw) =>
      this.mapper.toDomain(lobbyRaw),
    );
  }

  public async update({ lobby }: { lobby: Lobby }): Promise<void> {
    const lobbyRaw = this.mapper.toPersistence(lobby);

    await this.client.json.set(
      RedisLobbiesRepository.KEY,
      lobbyRaw.id,
      lobbyRaw,
    );

    const plainLobby = lobby.toPlain();
    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyUpdated,
      new LobbyUpdatedPayload({
        lobby: {
          ...plainLobby,
          players: plainLobby.players.map(({ status, ...player }) => ({
            ...player,
            isReady: status,
            heroesSelected: plainLobby.playableCharacters
              .filter((pc) => pc.pickedBy === player.userId)
              .map((pc) => pc.id),
          })),
          status: plainLobby.status,
        },
      }),
    );
  }

  public async del({ lobbyId }: { lobbyId: Lobby["id"] }): Promise<void> {
    await this.client.json.del(RedisLobbiesRepository.KEY, lobbyId);
  }
}
