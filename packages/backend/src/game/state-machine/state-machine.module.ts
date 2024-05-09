import { Module } from "@nestjs/common";
import { AuthzModule } from "src/authz/authz.module";
import { RedisModule } from "src/redis/redis.module";
import { MapModule } from "../map/map.module";
import { TimelineModule } from "../timeline/timeline.module";
import { EndPlayerTurnRepository } from "./end-player-turn/end-player-turn.repository";
import { EndPlayerTurnUseCase } from "./end-player-turn/end-player-turn.uc";
import { GetUserGameStateRepository } from "./get-user-game-state/get-user-game-state.repository";
import { GetUserGameStateUseCase } from "./get-user-game-state/get-user-game-state.uc";
import { PlayerStateService } from "./services/player-state/player-state.service";
import { StateMachinePublisherGateway } from "./state-machine.publisher-gateway";
import { StateMachineSubscriberGateway } from "./state-machine.subscriber-gateway";

@Module({
  imports: [AuthzModule, RedisModule, TimelineModule, MapModule],
  providers: [
    PlayerStateService,
    GetUserGameStateUseCase,
    GetUserGameStateRepository,
    EndPlayerTurnUseCase,
    EndPlayerTurnRepository,
    StateMachineSubscriberGateway,
    StateMachinePublisherGateway,
  ],
  exports: [GetUserGameStateUseCase, GetUserGameStateRepository],
})
export class StateMachineModule {}
