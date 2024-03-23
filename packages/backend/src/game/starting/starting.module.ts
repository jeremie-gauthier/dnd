import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { MovesService } from "../moves/moves.service";
import { GameStartingPrivateGateway } from "./game-starting-private.gateway";
import { ChangePositionRepository } from "./private/change-position/change-position.repository";
import { ChangePositionUseCase } from "./private/change-position/change-position.uc";

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
