import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameRepository } from "src/modules/game/application/repositories/game-repository.interface";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { Repository } from "typeorm";
import { Game as GamePersistence } from "../entities/game.entity";
import { GameMapper } from "../mappers/game.mapper";

@Injectable()
export class GamePostgresRepository implements GameRepository {
  constructor(
    @InjectRepository(GamePersistence)
    private readonly repository: Repository<GamePersistence>,
    private readonly mapper: GameMapper,
  ) {}

  public async create({ game }: { game: GameDomain }): Promise<GameDomain> {
    const persistence = this.mapper.toPersistence(game);
    await this.repository.save(persistence);
    return game;
  }

  public async getOne({
    gameId,
  }: { gameId: GameDomain["id"] }): Promise<GameDomain | null> {
    const game = await this.repository.findOne({
      where: {
        id: gameId,
      },
      relations: {},
    });

    return game ? this.mapper.toDomain(game) : null;
  }

  public async getOneOrThrow({
    gameId,
  }: { gameId: GameDomain["id"] }): Promise<GameDomain> {
    const game = await this.repository.findOneOrFail({
      where: {
        id: gameId,
      },
      relations: {},
    });

    return this.mapper.toDomain(game);
  }

  public async update({ game }: { game: GameDomain }): Promise<void> {
    const persistence = this.mapper.toPersistence(game);
    await this.repository.save(persistence);
  }

  public async del({ gameId }: { gameId: GameDomain["id"] }): Promise<void> {
    await this.repository.delete({ id: gameId });
  }
}
