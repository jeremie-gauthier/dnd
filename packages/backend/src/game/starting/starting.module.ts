import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { MovesService } from "../moves/services/moves.service";
import { ChangePositionRepository } from "./change-position/change-position.repository";
import { ChangePositionUseCase } from "./change-position/change-position.uc";
import { GameStartingPrivateGateway } from "./game-starting.private-gateway";

@Module({
  imports: [RedisModule],
  providers: [
    MovesService,
    GameStartingPrivateGateway,
    ChangePositionUseCase,
    ChangePositionRepository,
  ],
})
export class StartingModule {}
