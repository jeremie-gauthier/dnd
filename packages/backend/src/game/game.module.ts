import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { RedisModule } from "src/redis/redis.module";
import { GameChangesListener } from "./events/listeners/game-changes/game-changes.listener";
import { GameInitializationListener } from "./events/listeners/game-initialization/game-initialization.listener";
import { GameInitializationRepository } from "./events/listeners/game-initialization/game-initialization.repository";
import { GamePreparationPhaseListener } from "./events/listeners/game-preparation-phase/game-preparation-phase.listener";
import { GamePreparationPhaseRepository } from "./events/listeners/game-preparation-phase/game-preparation-phase.repository";
import { GamePrivateController } from "./game.private-controller";
import { MapModule } from "./map/map.module";
import { MovesModule } from "./moves/moves.module";
import { StartingModule } from "./starting/starting.module";
import { StateMachineModule } from "./state-machine/state-machine.module";

@Module({
  imports: [
    RedisModule,
    MapModule,
    StartingModule,
    MovesModule,
    StateMachineModule,
    TypeOrmModule.forFeature([CampaignStageProgression]),
    AuthzModule,
  ],
  controllers: [GamePrivateController],
  providers: [
    GameChangesListener,
    GameInitializationListener,
    GameInitializationRepository,
    GamePreparationPhaseListener,
    GamePreparationPhaseRepository,
  ],
})
export class GameModule {}
