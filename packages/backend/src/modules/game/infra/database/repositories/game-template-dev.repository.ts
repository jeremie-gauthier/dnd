import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameTemplateDevRepository } from "src/modules/game/application/repositories/game-template-dev-repository.interface";
import { Board as BoardDomain } from "src/modules/game/domain/board/board.entity";
import { GameEvents as GameEventsDomain } from "src/modules/game/domain/game-events/game-events.aggregate";
import { WinConditions as WinConditionsDomain } from "src/modules/game/domain/win-conditions/win-conditions.aggregate";
import { Repository } from "typeorm";
import { GameEvent as GameEventPersistence } from "../entities/game-event/game-event.entity";
import { GameTemplate as GameTemplatePersistence } from "../entities/game-template.entity";
import { Room as RoomPersistence } from "../entities/room/room.entity";
import { WinCondition as WinConditionPersistence } from "../entities/win-condition/win-condition.entity";
import { BoardMapper } from "../mappers/board.mapper";

@Injectable()
export class GameTemplateDevPostgresRepository
  implements GameTemplateDevRepository
{
  constructor(
    @InjectRepository(GameTemplatePersistence)
    private readonly gameTemplateRepository: Repository<GameTemplatePersistence>,
    private readonly boardMapper: BoardMapper,
  ) {}

  public async create({
    campaignId,
    board,
    winConditions,
    gameEvents,
  }: {
    campaignId: string;
    board: BoardDomain;
    winConditions: WinConditionsDomain;
    gameEvents: GameEventsDomain;
  }): Promise<void> {
    const boardPersistence = this.boardMapper.toPersistence(board);

    const uniqRooms = Array.from(
      new Map(
        boardPersistence.tiles
          .filter((tile) => tile.room !== null)
          .map((tile) => [tile.room!.id, tile.room!]),
      ).values(),
    );

    const boardWithoutRooms = {
      ...boardPersistence,
      tiles: boardPersistence.tiles.map((tile) => ({
        ...tile,
        room: tile.room ? { id: tile.room.id } : null,
      })),
    };

    await this.gameTemplateRepository.manager.transaction(async (trx) => {
      await trx.getRepository(RoomPersistence).save(uniqRooms);
      await trx.getRepository(GameTemplatePersistence).save({
        campaignId,
        board: boardWithoutRooms,
      });

      await trx.getRepository(WinConditionPersistence).insert(
        winConditions.toPlain().values.map(({ name, ...rest }) => ({
          gameTemplate: { campaignId },
          name,
          data: rest,
        })),
      );

      await trx.getRepository(GameEventPersistence).insert(
        gameEvents.toPlain().values.map(({ name, action, data }) => ({
          gameTemplate: { campaignId },
          name,
          action,
          data: data as any,
        })),
      );
    });
  }
}
