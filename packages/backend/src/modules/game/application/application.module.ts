import { Module } from "@nestjs/common";
import { LogService } from "../domain/log/log.service";
import { DatabaseModule } from "../infra/database/database.module";
import { GameListeners } from "./game.listeners";
import { GameStateService } from "./services/game-state.service";
import { DeleteGameUseCase } from "./use-cases/delete-game/delete-game.uc";
import { EndPlayerTurnUseCase } from "./use-cases/end-player-turn/end-player-turn.uc";
import { GameInitializationUseCase } from "./use-cases/game-initialization/game-initialization.uc";
import { GetUserGameStateUseCase } from "./use-cases/get-user-game-state/get-user-game-state.uc";
import { OpenDoorUseCase } from "./use-cases/open-door/open-door.uc";
import { PlayableEntityAttackUseCase } from "./use-cases/playable-entity-attack/playable-entity-attack.uc";
import { PlayableEntityDeleteItemUseCase } from "./use-cases/playable-entity-delete-item/playable-entity-delete-item.uc";
import { PlayableEntityMoveUseCase } from "./use-cases/playable-entity-move/playable-entity-move.uc";
import { PlayableEntitySwapItemsUseCase } from "./use-cases/playable-entity-swap-items/playable-entity-swap-items.uc";

@Module({
  imports: [DatabaseModule],
  providers: [
    GameListeners,
    DeleteGameUseCase,
    EndPlayerTurnUseCase,
    GameInitializationUseCase,
    GetUserGameStateUseCase,
    OpenDoorUseCase,
    PlayableEntityAttackUseCase,
    PlayableEntityMoveUseCase,
    LogService,
    GameStateService,
    PlayableEntityDeleteItemUseCase,
    PlayableEntitySwapItemsUseCase,
  ],
  exports: [
    GameListeners,
    DeleteGameUseCase,
    EndPlayerTurnUseCase,
    GameInitializationUseCase,
    GetUserGameStateUseCase,
    OpenDoorUseCase,
    PlayableEntityAttackUseCase,
    PlayableEntityMoveUseCase,
    LogService,
    PlayableEntityDeleteItemUseCase,
    PlayableEntitySwapItemsUseCase,
  ],
})
export class ApplicationModule {}
