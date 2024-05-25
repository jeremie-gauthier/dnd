import { Module } from "@nestjs/common";
import { AuthzModule } from "src/authz/authz.module";
import { RedisModule } from "src/redis/redis.module";
import { BackupModule } from "../backup/backup.module";
import { MapModule } from "../map/map.module";
import { TrapModule } from "../trap/trap.module";
import { MovesSubscriberGateway } from "./moves.subscriber-gateway";
import { PlayableEntityMoveRepository } from "./playable-entity-move/playable-entity-move.repository";
import { PlayableEntityMoveUseCase } from "./playable-entity-move/playable-entity-move.uc";
import { MovesService } from "./services/moves.service";

@Module({
  imports: [AuthzModule, RedisModule, MapModule, TrapModule, BackupModule],
  exports: [MovesService],
  providers: [
    MovesService,
    PlayableEntityMoveUseCase,
    PlayableEntityMoveRepository,
    MovesSubscriberGateway,
  ],
})
export class MovesModule {}
