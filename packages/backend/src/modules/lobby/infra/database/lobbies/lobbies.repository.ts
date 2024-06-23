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
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { LobbyUpdatedPayload } from "src/modules/shared/events/lobby/lobby-changed.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { RedisService } from "../../../../../redis/redis.service";
import { LobbiesRepository } from "../../../application/repositories/lobbies-repository.interface";
import { Lobby } from "../../../domain/lobby/lobby.aggregate";
import { LobbiesMapper } from "./lobbies.mapper";
import { ILobbyPersistence, LobbyPersistence } from "./lobby.model";

type LobbiesKey = Record<ILobbyPersistence["id"], ILobbyPersistence>;

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
  }): Promise<LobbyPersistence> {
    const lobby: ILobbyPersistence = {
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
    return new LobbyPersistence(lobby, this.mapper);
  }

  public async getOne({
    lobbyId,
  }: { lobbyId: Lobby["id"] }): Promise<LobbyPersistence | null> {
    const lobbyRaw = (await this.client.json.get(RedisLobbiesRepository.KEY, {
      path: lobbyId.id,
    })) as ILobbyPersistence | null;
    return lobbyRaw ? new LobbyPersistence(lobbyRaw, this.mapper) : null;
  }

  public async getOneOrThrow({
    lobbyId,
  }: { lobbyId: Lobby["id"] }): Promise<LobbyPersistence> {
    const lobbyRaw = (await this.client.json.get(RedisLobbiesRepository.KEY, {
      path: lobbyId.id,
    })) as ILobbyPersistence | null;
    if (!lobbyRaw) {
      throw new NotFoundException("Lobby not found");
    }
    return new LobbyPersistence(lobbyRaw, this.mapper);
  }

  public async getMany(): Promise<LobbyPersistence[]> {
    const lobbiesRaw = (await this.client.json.get(
      RedisLobbiesRepository.KEY,
    )) as LobbiesKey;
    return Object.values(lobbiesRaw).map(
      (lobbyRaw) => new LobbyPersistence(lobbyRaw, this.mapper),
    );
  }

  public async update({ lobby }: { lobby: Lobby }): Promise<void> {
    const lobbyRaw = this.mapper.toPersistence(lobby);

    await this.client.json.set(
      RedisLobbiesRepository.KEY,
      lobbyRaw.id,
      lobbyRaw,
    );

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyUpdated,
      new LobbyUpdatedPayload({ lobby: this.mapper.toView(lobbyRaw) }),
    );
  }

  public async del({ lobbyId }: { lobbyId: Lobby["id"] }): Promise<void> {
    await this.client.json.del(RedisLobbiesRepository.KEY, lobbyId.id);
  }
}
