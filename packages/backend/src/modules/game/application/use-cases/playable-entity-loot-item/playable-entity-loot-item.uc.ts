import { Inject } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameUpdatedPayload } from "src/modules/shared/events/game/game-updated.payload";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";
import {
  ITEM_REPOSITORY,
  ItemRepository,
} from "../../repositories/item-repository.interface";
import { PlayableEntityLootItemInputDto } from "./playable-entity-loot-item.dto";

export class PlayableEntityLootItemUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    @Inject(ITEM_REPOSITORY)
    private readonly itemRepository: ItemRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    gameId,
    itemId,
    replacedItemId,
    storageSpace,
    userId,
  }: PlayableEntityLootItemInputDto & { userId: User["id"] }): Promise<void> {
    const [game, item] = await Promise.all([
      this.gameRepository.getOneOrThrow({ gameId }),
      this.itemRepository.getOneOrThrow({ name: itemId }),
    ]);

    game.playerLootItem({
      userId,
      item,
      replacedItemId,
      storageSpace,
    });

    await this.gameRepository.update({ game });

    const plainGame = game.toPlain();
    this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game: plainGame }),
    );
  }
}
