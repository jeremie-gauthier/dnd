import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { GetUserGameStateRepository } from "./get-user-game-state/get-user-game-state.repository";
import { GetUserGameStateUseCase } from "./get-user-game-state/get-user-game-state.uc";
import { PlayerStateService } from "./services/player-state.service";

@Module({
  imports: [RedisModule],
  providers: [
    PlayerStateService,
    GetUserGameStateUseCase,
    GetUserGameStateRepository,
  ],
  exports: [
    PlayerStateService,
    GetUserGameStateUseCase,
    GetUserGameStateRepository,
  ],
})
export class StateMachineModule {}
