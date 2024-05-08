import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { MapModule } from "../map/map.module";
import { TimelineModule } from "../timeline/timeline.module";
import { EndPlayerTurnRepository } from "./end-player-turn/end-player-turn.repository";
import { EndPlayerTurnUseCase } from "./end-player-turn/end-player-turn.uc";
import { GetUserGameStateRepository } from "./get-user-game-state/get-user-game-state.repository";
import { GetUserGameStateUseCase } from "./get-user-game-state/get-user-game-state.uc";
import { PlayerStateService } from "./services/player-state/player-state.service";
import { StateMachinePrivateGateway } from "./state-machine.private-gateway";

@Module({
  imports: [RedisModule, TimelineModule, MapModule],
  providers: [
    PlayerStateService,
    GetUserGameStateUseCase,
    GetUserGameStateRepository,
    EndPlayerTurnUseCase,
    EndPlayerTurnRepository,
    StateMachinePrivateGateway,
  ],
  exports: [GetUserGameStateUseCase, GetUserGameStateRepository],
})
export class StateMachineModule {}
