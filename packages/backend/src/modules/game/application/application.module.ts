import { Module } from "@nestjs/common";
import { CombatService } from "../domain/combat/combat.service";
import { CoordService } from "../domain/coord/coord.service";
import { ItemService } from "../domain/item/item.service";
import { LogService } from "../domain/log/log.service";
import { MapService } from "../domain/map/map.service";
import { MoveService } from "../domain/move/move.service";
import { InitiativeService } from "../domain/playable-entities/playable-entity/initiative/initiative.service";
import { PlayableEntityService } from "../domain/playable-entities/playable-entity/playable-entity.service";
import { PlayerStateService } from "../domain/player-state/player-state.service";
import { SpawnService } from "../domain/spawn/spawn.service";
import { TrapService } from "../domain/trap/trap.service";
import { TurnService } from "../domain/turn/turn.service";
import { VisibilityService } from "../domain/visibility/visibility.service";
import { DatabaseModule } from "../infra/database/database.module";
import { GameListeners } from "./game.listeners";
import { BoardService } from "./services/board.service";
import { GameStateService } from "./services/game-state.service";
import { DeleteGameUseCase } from "./use-cases/delete-game/delete-game.uc";
import { EndPlayerTurnUseCase } from "./use-cases/end-player-turn/end-player-turn.uc";
import { GameInitializationUseCase } from "./use-cases/game-initialization/game-initialization.uc";
import { GetUserGameStateUseCase } from "./use-cases/get-user-game-state/get-user-game-state.uc";
import { OpenDoorUseCase } from "./use-cases/open-door/open-door.uc";
import { PlayableEntityAttackUseCase } from "./use-cases/playable-entity-attack/playable-entity-attack.uc";
import { PlayableEntityMoveUseCase } from "./use-cases/playable-entity-move/playable-entity-move.uc";

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
    CombatService,
    CoordService,
    InitiativeService,
    ItemService,
    LogService,
    MapService,
    MoveService,
    PlayerStateService,
    SpawnService,
    TrapService,
    TurnService,
    VisibilityService,
    PlayableEntityService,
    BoardService,
    GameStateService,
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
    CombatService,
    CoordService,
    InitiativeService,
    ItemService,
    LogService,
    MapService,
    MoveService,
    PlayerStateService,
    SpawnService,
    TrapService,
    TurnService,
    VisibilityService,
    PlayableEntityService,
  ],
})
export class ApplicationModule {}
