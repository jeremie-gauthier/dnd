import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attack } from "src/database/entities/attack.entity";
import { GamesRepository } from "src/redis/repositories/games.repository";
import { Repository } from "typeorm";

@Injectable()
export class PlayableEntityAttackRepository {
  constructor(
    private readonly gamesRepository: GamesRepository,
    @InjectRepository(Attack)
    private readonly attackRepository: Repository<Attack>,
  ) {}

  public async getGameById({
    gameId,
  }: { gameId: GameEntity["id"] }): Promise<GameEntity | null> {
    return await this.gamesRepository.getOne(gameId);
  }

  public async updateGame({ game }: { game: GameEntity }): Promise<void> {
    await this.gamesRepository.update(game);
  }

  public async getAttackById({
    attackId,
  }: { attackId: Attack["id"] }): Promise<Attack> {
    return await this.attackRepository.findOneOrFail({
      where: {
        id: attackId,
      },
      relations: {
        item: true,
        attackDices: {
          dice: true,
        },
      },
    });
  }
}
