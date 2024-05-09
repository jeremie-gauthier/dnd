import { Module } from "@nestjs/common";
import { AuthzModule } from "src/authz/authz.module";
import { RedisModule } from "src/redis/redis.module";
import { MapModule } from "../map/map.module";
import { MovesService } from "../moves/services/moves.service";
import { ChangePositionRepository } from "./change-position/change-position.repository";
import { ChangePositionUseCase } from "./change-position/change-position.uc";
import { GameStartingSubscriberGateway } from "./game-starting.subscriber-gateway";

@Module({
  imports: [AuthzModule, RedisModule, MapModule],
  providers: [
    MovesService,
    ChangePositionUseCase,
    ChangePositionRepository,
    GameStartingSubscriberGateway,
  ],
})
export class StartingModule {}
