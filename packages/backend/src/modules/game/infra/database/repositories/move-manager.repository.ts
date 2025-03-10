import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoveManagerRepository } from "src/modules/game/application/repositories/move-manager-repository.interface";
import { Move } from "src/modules/game/domain/_move/move.aggregate";
import { Repository } from "typeorm";
import { Game } from "../entities/game.entity";
import { MoveAggregateMapper } from "../mappers/move-aggregate.mapper";

@Injectable()
export class MoveManagerPostgresRepository implements MoveManagerRepository {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly moveAggregateMapper: MoveAggregateMapper,
  ) {}

  public async getOneOrThrow({ gameId }: { gameId: string }): Promise<Move> {
    const game = await this.gameRepository.findOneOrFail({
      where: {
        id: gameId,
      },
      relations: {
        board: {
          tiles: {
            interactiveEntities: true,
            nonInteractiveEntities: true,
            playableEntities: {
              actionsDoneThisTurn: true,
            },
          },
        },
        gameMaster: true,
      },
    });

    return this.moveAggregateMapper.toDomain(game);
  }

  public async update({ game }: { game: Move }): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
