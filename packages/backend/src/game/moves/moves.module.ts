import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { MapModule } from "../map/map.module";
import { TrapModule } from "../trap/trap.module";
import { MovesPrivateGateway } from "./moves.private-gateway";
import { PlayableEntityMoveRepository } from "./playable-entity-move/playable-entity-move.repository";
import { PlayableEntityMoveUseCase } from "./playable-entity-move/playable-entity-move.uc";
import { MovesService } from "./services/moves.service";

@Module({
  imports: [RedisModule, MapModule, TrapModule],
  exports: [MovesService],
  providers: [
    MovesService,
    MovesPrivateGateway,
    PlayableEntityMoveUseCase,
    PlayableEntityMoveRepository,
  ],
})
export class MovesModule {}
