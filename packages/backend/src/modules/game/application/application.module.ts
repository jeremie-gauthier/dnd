import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dice } from "src/database/entities/dice.entity";
import { Item } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { BackupRepository } from "../domain/backup/backup.repository";
import { BackupService } from "../domain/backup/backup.service";
import { CombatService } from "../domain/combat/combat.service";
import { CoordService } from "../domain/coord/coord.service";
import { DiceService } from "../domain/dice/dice.service";
import { InitiativeService } from "../domain/initiative/initiative.service";
import { ItemService } from "../domain/item/item.service";
import { LogService } from "../domain/log/log.service";
import { MapService } from "../domain/map/map.service";
import { MoveService } from "../domain/move/move.service";
import { PlayableEntityService } from "../domain/playable-entity/playable-entity.service";
import { PlayerStateService } from "../domain/player-state/player-state.service";
import { SpawnService } from "../domain/spawn/spawn.service";
import { TrapService } from "../domain/trap/trap.service";
import { TurnService } from "../domain/turn/turn.service";
import { VisibilityService } from "../domain/visibility/visibility.service";
import { DatabaseModule } from "../infra/database/database.module";
import { GameListeners } from "./game.listeners";
import { DeleteGameRepository } from "./use-cases/delete-game/delete-game.repository";
import { DeleteGameUseCase } from "./use-cases/delete-game/delete-game.uc";
import { EndPlayerTurnUseCase } from "./use-cases/end-player-turn/end-player-turn.uc";
import { GameInitializationRepository } from "./use-cases/game-initialization/game-initialization.repository";
import { GameInitializationUseCase } from "./use-cases/game-initialization/game-initialization.uc";
import { GetUserGameStateUseCase } from "./use-cases/get-user-game-state/get-user-game-state.uc";
import { OpenDoorUseCase } from "./use-cases/open-door/open-door.uc";
import { PlayableEntityAttackUseCase } from "./use-cases/playable-entity-attack/playable-entity-attack.uc";
import { PlayableEntityMoveUseCase } from "./use-cases/playable-entity-move/playable-entity-move.uc";

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Dice, Item, Weapon, Spell]),
  ],
  providers: [
    GameListeners,
    DeleteGameUseCase,
    DeleteGameRepository,
    EndPlayerTurnUseCase,
    GameInitializationUseCase,
    GameInitializationRepository,
    GetUserGameStateUseCase,
    OpenDoorUseCase,
    PlayableEntityAttackUseCase,
    PlayableEntityMoveUseCase,
    BackupService,
    BackupRepository,
    CombatService,
    CoordService,
    DiceService,
    InitiativeService,
    ItemService,
    LogService,
    MapService,
    MoveService,
    PlayableEntityService,
    PlayerStateService,
    SpawnService,
    TrapService,
    TurnService,
    VisibilityService,
  ],
  exports: [
    GameListeners,
    DeleteGameUseCase,
    DeleteGameRepository,
    EndPlayerTurnUseCase,
    GameInitializationUseCase,
    GameInitializationRepository,
    GetUserGameStateUseCase,
    OpenDoorUseCase,
    PlayableEntityAttackUseCase,
    PlayableEntityMoveUseCase,
    BackupService,
    BackupRepository,
    CombatService,
    CoordService,
    DiceService,
    InitiativeService,
    ItemService,
    LogService,
    MapService,
    MoveService,
    PlayableEntityService,
    PlayerStateService,
    SpawnService,
    TrapService,
    TurnService,
    VisibilityService,
  ],
})
export class ApplicationModule {}
