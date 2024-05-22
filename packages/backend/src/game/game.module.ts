import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { Dice } from "src/database/entities/dice.entity";
import { Item } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { RedisModule } from "src/redis/redis.module";
import { CombatModule } from "./combat/combat.module";
import { DiceModule } from "./dice/dice.module";
import { GameInitializationListener } from "./events/listeners/game-initialization/game-initialization.listener";
import { GameInitializationRepository } from "./events/listeners/game-initialization/game-initialization.repository";
import { EndPlayingEntityTurnListener } from "./events/listeners/hooks/end-playing-entity-turn/end-playing-entity-turn.listener";
import { EndPlayingEntityTurnRepository } from "./events/listeners/hooks/end-playing-entity-turn/end-playing-entity-turn.repository";
import { RerollInitiativesListener } from "./events/listeners/hooks/reroll-initiatives/reroll-initiatives.listener";
import { RerollInitiativesRepository } from "./events/listeners/hooks/reroll-initiatives/reroll-initiatives.repository";
import { SpawnEnemiesListener } from "./events/listeners/hooks/spawn-enemies/spawn-enemies.listener";
import { SpawnEnemiesRepository } from "./events/listeners/hooks/spawn-enemies/spawn-enemies.repository";
import { UpdateTimelineListener } from "./events/listeners/update-timeline/update-timeline.listener";
import { UpdateTimelineRepository } from "./events/listeners/update-timeline/update-timeline.repository";
import { GamePrivateController } from "./game.private-controller";
import { InteractionModule } from "./interaction/interaction.module";
import { InventoryModule } from "./inventory/inventory.module";
import { MapModule } from "./map/map.module";
import { MovesModule } from "./moves/moves.module";
import { PlayableEntityModule } from "./playable-entity/playable-entity.module";
import { StartingModule } from "./starting/starting.module";
import { StateMachineModule } from "./state-machine/state-machine.module";
import { TimelineModule } from "./timeline/timeline.module";
import { TrapModule } from "./trap/trap.module";

@Module({
  imports: [
    RedisModule,
    MapModule,
    StartingModule,
    MovesModule,
    TypeOrmModule.forFeature([
      CampaignStageProgression,
      Dice,
      Item,
      Weapon,
      Spell,
    ]),
    AuthzModule,
    TimelineModule,
    InteractionModule,
    TrapModule,
    CombatModule,
    PlayableEntityModule,
    StateMachineModule,
    InventoryModule,
    DiceModule,
  ],
  controllers: [GamePrivateController],
  providers: [
    UpdateTimelineListener,
    UpdateTimelineRepository,
    EndPlayingEntityTurnListener,
    EndPlayingEntityTurnRepository,
    SpawnEnemiesListener,
    SpawnEnemiesRepository,
    RerollInitiativesListener,
    RerollInitiativesRepository,
    GameInitializationListener,
    GameInitializationRepository,
  ],
})
export class GameModule {}
