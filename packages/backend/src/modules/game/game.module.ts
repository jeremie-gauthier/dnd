import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { Dice } from "src/database/entities/dice.entity";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { Item } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { AuthzModule } from "src/modules/authz/authz.module";
import { RedisModule } from "src/redis/redis.module";
import { EndPlayerTurnRepository } from "./end-player-turn/end-player-turn.repository";
import { EndPlayerTurnUseCase } from "./end-player-turn/end-player-turn.uc";
import { GameInitializationRepository } from "./game-initialization/game-initialization.repository";
import { GameInitializationUseCase } from "./game-initialization/game-initialization.uc";
import { GameListeners } from "./game.listeners";
import { GamePrivateController } from "./game.private-controller";
import { GamePublisherGateway } from "./game.publisher-gateway";
import { GameSubscriberGateway } from "./game.subscriber-gateway";
import { GetUserGameStateUseCase } from "./get-user-game-state/get-user-game-state.uc";
import { OpenDoorUseCase } from "./open-door/open-door.uc";
import { PlayableEntityAttackUseCase } from "./playable-entity-attack/playable-entity-attack.uc";
import { PlayableEntityMoveUseCase } from "./playable-entity-move/playable-entity-move.uc";
import { BackupRepository } from "./services/backup/backup.repository";
import { BackupService } from "./services/backup/backup.service";
import { CombatService } from "./services/combat/combat.service";
import { CoordService } from "./services/coord/coord.service";
import { DiceService } from "./services/dice/dice.service";
import { InitiativeService } from "./services/initiative/initiative.service";
import { ItemService } from "./services/item/item.service";
import { LogService } from "./services/log/log.service";
import { MapSerializerService } from "./services/map-serializer/map-serializer.service";
import { MapService } from "./services/map/map.service";
import { MoveService } from "./services/move/move.service";
import { PlayableEntityService } from "./services/playable-entity/playable-entity.service";
import { PlayerStateService } from "./services/player-state/player-state.service";
import { SpawnService } from "./services/spawn/spawn.service";
import { TrapService } from "./services/trap/trap.service";
import { TurnService } from "./services/turn/turn.service";
import { VisibilityService } from "./services/visibility/visibility.service";

@Module({
  imports: [
    AuthzModule,
    RedisModule,
    TypeOrmModule.forFeature([
      CampaignStageProgression,
      Dice,
      Item,
      Weapon,
      Spell,
      EnemyTemplate,
    ]),
  ],
  controllers: [GamePrivateController],
  providers: [
    GameListeners,
    GameSubscriberGateway,
    GamePublisherGateway,
    GameInitializationUseCase,
    GameInitializationRepository,
    EndPlayerTurnUseCase,
    EndPlayerTurnRepository,
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
    MapSerializerService,
    MoveService,
    PlayableEntityService,
    PlayerStateService,
    SpawnService,
    TrapService,
    TurnService,
    VisibilityService,
  ],
})
export class GameModule {}
