import { Module } from "@nestjs/common";
import { DatabaseModule } from "../infra/database/database.module";
import { GameListeners } from "./game.listeners";
import { DomainEventMapperService } from "./services/domain-event-mapper.service";
import { DomainEventsDispatcherService } from "./services/domain-events-dispatcher.service";
import { GameStateService } from "./services/game-state.service";
import { CreateItemsFromCsvUseCase } from "./use-cases/create-items-from-csv/create-items-from-csv.uc";
import { DeleteGameUseCase } from "./use-cases/delete-game/delete-game.uc";
import { GameInitializationUseCase } from "./use-cases/game-initialization/game-initialization.uc";
import { GetHeroDetailsUseCase } from "./use-cases/get-hero-details/get-hero-details.uc";
import { GetUserGameStateUseCase } from "./use-cases/get-user-game-state/get-user-game-state.uc";
import { PlayableEntityAttackUseCase } from "./use-cases/playable-entity-attack/playable-entity-attack.uc";
import { PlayableEntityDeleteItemUseCase } from "./use-cases/playable-entity-delete-item/playable-entity-delete-item.uc";
import { PlayableEntityDrinkPotionUseCase } from "./use-cases/playable-entity-drink-potion/playable-entity-drink-potion.uc";
import { PlayableEntityEndTurnUseCase } from "./use-cases/playable-entity-end-turn/playable-entity-end-turn.uc";
import { PlayableEntityLootItemUseCase } from "./use-cases/playable-entity-loot-item/playable-entity-loot-item.uc";
import { PlayableEntityMoveUseCase } from "./use-cases/playable-entity-move/playable-entity-move.uc";
import { PlayableEntityOpenChestUseCase } from "./use-cases/playable-entity-open-chest/playable-entity-open-chest.uc";
import { PlayableEntityOpenDoorUseCase } from "./use-cases/playable-entity-open-door/playable-entity-open-door.uc";
import { PlayableEntitySwapItemsUseCase } from "./use-cases/playable-entity-swap-items/playable-entity-swap-items.uc";

@Module({
  imports: [DatabaseModule],
  providers: [
    GameListeners,
    DeleteGameUseCase,
    PlayableEntityEndTurnUseCase,
    GameInitializationUseCase,
    GetUserGameStateUseCase,
    PlayableEntityOpenDoorUseCase,
    PlayableEntityAttackUseCase,
    PlayableEntityMoveUseCase,
    GameStateService,
    PlayableEntityDeleteItemUseCase,
    PlayableEntitySwapItemsUseCase,
    PlayableEntityOpenChestUseCase,
    PlayableEntityLootItemUseCase,
    CreateItemsFromCsvUseCase,
    PlayableEntityDrinkPotionUseCase,
    DomainEventMapperService,
    DomainEventsDispatcherService,
    GetHeroDetailsUseCase,
  ],
  exports: [
    GameListeners,
    DeleteGameUseCase,
    PlayableEntityEndTurnUseCase,
    GameInitializationUseCase,
    GetUserGameStateUseCase,
    PlayableEntityOpenDoorUseCase,
    PlayableEntityAttackUseCase,
    PlayableEntityMoveUseCase,
    PlayableEntityDeleteItemUseCase,
    PlayableEntitySwapItemsUseCase,
    PlayableEntityOpenChestUseCase,
    PlayableEntityLootItemUseCase,
    CreateItemsFromCsvUseCase,
    PlayableEntityDrinkPotionUseCase,
    GetHeroDetailsUseCase,
  ],
})
export class ApplicationModule {}
