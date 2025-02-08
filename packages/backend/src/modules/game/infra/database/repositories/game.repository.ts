import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameRepository } from "src/modules/game/application/repositories/game-repository.interface";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { Repository, TypeORMError } from "typeorm";
import { PlayableEntity as PlayableEntityPersistence } from "../entities/game-entity/playable-entity/playable-entity.entity";
import { Game as GamePersistence } from "../entities/game.entity";
import { MonsterKilled } from "../entities/monster-killed.entity";
import { Room as RoomPersistence } from "../entities/room/room.entity";
import { PlayableEntityPersistence as IPlayableEntityPersistence } from "../interfaces/playable-entity-persistence.interface";
import { GameMapper } from "../mappers/game.mapper";

@Injectable()
export class GamePostgresRepository implements GameRepository {
  constructor(
    @InjectRepository(GamePersistence)
    private readonly gameRepository: Repository<GamePersistence>,
    @InjectRepository(RoomPersistence)
    private readonly roomRepository: Repository<RoomPersistence>,
    @InjectRepository(PlayableEntityPersistence)
    private readonly playableEntityRepository: Repository<PlayableEntityPersistence>,
    @InjectRepository(MonsterKilled)
    private readonly monsterKilledRepository: Repository<MonsterKilled>,
    private readonly mapper: GameMapper,
  ) {}

  public async create({ game }: { game: GameDomain }): Promise<GameDomain> {
    const persistence = this.mapper.toPersistence(game);
    await this.gameRepository.save(persistence);
    return game;
  }

  public async getOne({
    gameId,
  }: { gameId: GameDomain["id"] }): Promise<GameDomain | null> {
    const [game, rooms, playableEntities, monstersKilled] = await Promise.all([
      this.gameRepository.findOne({
        where: {
          id: gameId,
        },
        relations: {
          board: {
            tiles: {
              playableEntities: true,
              interactiveEntities: true,
              nonInteractiveEntities: true,
            },
          },
          events: {
            gameEvent: true,
          },
          itemsLooted: true,
          winConditions: true,
        },
      }),
      this.roomRepository
        .createQueryBuilder("room")
        .where({
          tiles: {
            board: {
              game: { id: gameId },
            },
          },
        })
        .groupBy("room.id")
        .getMany(),
      this.playableEntityRepository.find({
        where: {
          tile: {
            board: {
              game: {
                id: gameId,
              },
            },
          },
        },
        relations: {
          actionsDoneThisTurn: true,
          inventory: {
            inventoryItems: {
              item: {
                attacks: {
                  diceThrows: {
                    dice: true,
                  },
                },
                manaCosts: true,
                itemPerks: {
                  perks: true,
                  diceThrows: {
                    dice: true,
                  },
                },
              },
            },
          },
          conditions: true,
        },
      }),
      this.monsterKilledRepository.find({
        where: {
          room: {
            tiles: {
              board: {
                game: { id: gameId },
              },
            },
          },
        },
        order: { createdDate: "DESC" },
      }),
    ]);

    // TODO: s'assurer que playableEntities contient bien les columns de Hero qui ne sont pas presentes dans Monster
    return game
      ? this.mapper.toDomain({
          ...game,
          rooms,
          playableEntities: playableEntities as IPlayableEntityPersistence[],
          monstersKilled,
        })
      : null;
  }

  public async getOneOrThrow({
    gameId,
  }: { gameId: GameDomain["id"] }): Promise<GameDomain> {
    const game = await this.getOne({ gameId });
    if (!game) {
      throw new TypeORMError(`No game entity found for '${gameId}'`);
    }
    return game;
  }

  public async update({ game }: { game: GameDomain }): Promise<void> {
    const persistence = this.mapper.toPersistence(game);
    await this.gameRepository.save(persistence);
  }

  public async del({ gameId }: { gameId: GameDomain["id"] }): Promise<void> {
    await this.gameRepository.delete({ id: gameId });
  }
}
