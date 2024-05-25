import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { Attack } from "src/database/entities/attack.entity";
import { RedisModule } from "src/redis/redis.module";
import { BackupModule } from "../backup/backup.module";
import { DiceModule } from "../dice/dice.module";
import { MapModule } from "../map/map.module";
import { MovesModule } from "../moves/moves.module";
import { PlayableEntityModule } from "../playable-entity/playable-entity.module";
import { CombatSubscriberGateway } from "./combat.subscriber-gateway";
import { PlayableEntityAttackRepository } from "./playable-entity-attack/playable-entity-attack.repository";
import { PlayableEntityAttackUseCase } from "./playable-entity-attack/playable-entity-attack.uc";
import { CombatService } from "./services/combat/combat.service";
import { SpawnService } from "./services/spawn/spawn.service";

@Module({
  imports: [
    AuthzModule,
    RedisModule,
    MapModule,
    DiceModule,
    PlayableEntityModule,
    MovesModule,
    BackupModule,
    TypeOrmModule.forFeature([Attack]),
  ],
  exports: [CombatService, SpawnService],
  providers: [
    CombatSubscriberGateway,
    CombatService,
    PlayableEntityAttackUseCase,
    PlayableEntityAttackRepository,
    SpawnService,
  ],
})
export class CombatModule {}
