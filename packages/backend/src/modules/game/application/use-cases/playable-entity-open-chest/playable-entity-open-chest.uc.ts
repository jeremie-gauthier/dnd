import { PlayableEntityOpenChestInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Item } from "src/modules/game/domain/item/item.abstract";
import { ChestTrapTriggeredPayload } from "src/modules/shared/events/game/chest-trap-triggered.payload";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameUpdatedPayload } from "src/modules/shared/events/game/game-updated.payload";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";
import {
  ITEM_REPOSITORY,
  ItemRepository,
} from "../../repositories/item-repository.interface";
import { TurnService } from "../../services/turn.service";

@Injectable()
export class PlayableEntityOpenChestUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    @Inject(ITEM_REPOSITORY)
    private readonly itemRepository: ItemRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly turnService: TurnService,
  ) {}

  public async execute({
    gameId,
    coordOfTileWithChest,
    userId,
  }: PlayableEntityOpenChestInput & {
    userId: User["id"];
  }): Promise<{ itemFound: ReturnType<Item["toPlain"]> }> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    const { itemsLooted, maxLevelLoot, hostUserId } = game.playerOpenChest({
      userId,
      coordOfTileWithChest: new Coord(coordOfTileWithChest),
    });

    const itemFound = await this.itemRepository.getOneRandom({
      itemsLooted,
      maxLevelLoot,
      hostUserId,
    });

    game.markItemAsLooted({ item: itemFound });
    if (itemFound.isChestTrap()) {
      const trapTriggered = game.playerTriggeredAChestTrap({
        userId,
        chestTrap: itemFound,
      });

      if (trapTriggered) {
        const {
          entityThatTriggeredTheChestTrap,
          playingEntitiesWhoseTurnEnded,
          playingEntitiesWhoseTurnStarted,
        } = trapTriggered;

        this.eventEmitter.emitAsync(
          GameEvent.ChestTrapTriggered,
          new ChestTrapTriggeredPayload({
            chestTrapItem: itemFound.toPlain(),
            game: game.toPlain(),
            subjectEntity: entityThatTriggeredTheChestTrap.toPlain(),
          }),
        );

        this.turnService.emitAsyncTurnEvents({
          game,
          playingEntitiesWhoseTurnEnded,
          playingEntitiesWhoseTurnStarted,
        });
      }
    }

    await this.gameRepository.update({ game });

    const plainGame = game.toPlain();
    this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game: plainGame }),
    );

    return { itemFound: itemFound.toPlain() };
  }
}
