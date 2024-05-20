import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { Attack } from "src/database/entities/attack.entity";
import { RedisModule } from "src/redis/redis.module";
import { DiceModule } from "../dice/dice.module";
import { MapModule } from "../map/map.module";
import { CombatSubscriberGateway } from "./combat.subscriber-gateway";
import { PlayableEntityAttackRepository } from "./playable-entity-attack/playable-entity-attack.repository";
import { PlayableEntityAttackUseCase } from "./playable-entity-attack/playable-entity-attack.uc";
import { CombatService } from "./services/combat/combat.service";

@Module({
  imports: [
    AuthzModule,
    RedisModule,
    MapModule,
    DiceModule,
    TypeOrmModule.forFeature([Attack]),
  ],
  exports: [CombatService],
  providers: [
    CombatSubscriberGateway,
    CombatService,
    PlayableEntityAttackUseCase,
    PlayableEntityAttackRepository,
  ],
})
export class CombatModule {}
