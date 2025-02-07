import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameTemplateRepository } from "src/modules/game/application/repositories/game-template-repository.interface";
import { Board } from "src/modules/game/domain/board/board.entity";
import { GameEvents } from "src/modules/game/domain/game-events/game-events.aggregate";
import { WinConditions } from "src/modules/game/domain/win-conditions/win-conditions.aggregate";
import { Repository } from "typeorm";
import { GameTemplate } from "../entities/game-template.entity";
import { BoardMapper } from "../mappers/board.mapper";
import { GameEventFactory } from "../mappers/factories/game-event.factory";
import { WinConditionFactory } from "../mappers/factories/win-condition.factory";

@Injectable()
export class GameTemplatePostgresRepository implements GameTemplateRepository {
  constructor(
    @InjectRepository(GameTemplate)
    private readonly gameTemplateRepository: Repository<GameTemplate>,
    private readonly boardMapper: BoardMapper,
  ) {}

  public async getOneOrThrow({ campaignId }: { campaignId: string }): Promise<{
    board: Board;
    events: GameEvents;
    winConditions: WinConditions;
  }> {
    const gameTemplate = await this.gameTemplateRepository.findOneOrFail({
      where: {
        campaignId,
      },
      relations: {
        board: {
          rooms: true,
          tiles: {
            entities: true,
          },
        },
        events: true,
        winConditions: true,
      },
    });

    const boardDomain = this.boardMapper.toDomain(gameTemplate.board);
    const eventsDomain = new GameEvents({
      values: gameTemplate.events.map((event) =>
        GameEventFactory.create(event),
      ),
    });
    const winConditionsDomain = new WinConditions({
      values: gameTemplate.winConditions.map((winCondition) =>
        WinConditionFactory.create(winCondition),
      ),
    });

    return {
      board: boardDomain,
      events: eventsDomain,
      winConditions: winConditionsDomain,
    };
  }
}
