import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { Hero } from "src/database/entities/hero.entity";
import { RedisModule } from "src/redis/redis.module";
import { CreateLobbyRepository } from "./create-lobby/create-lobby.repository";
import { CreateLobbyUseCase } from "./create-lobby/create-lobby.uc";
import { DiscardGameMasterRepository } from "./discard-game-master/discard-game-master.repository";
import { DiscardGameMasterUseCase } from "./discard-game-master/discard-game-master.uc";
import { DiscardHeroRepository } from "./discard-hero/discard-hero.repository";
import { DiscardHeroUseCase } from "./discard-hero/discard-hero.uc";
import { GameInitializationDoneListener } from "./events/listeners/game-initialization-done/game-initialization-done.listener";
import { GetLobbiesRepository } from "./get-lobbies/get-lobbies.repository";
import { GetLobbiesUseCase } from "./get-lobbies/get-lobbies.uc";
import { GetLobbyRepository } from "./get-lobby/get-lobby.repository";
import { GetLobbyUseCase } from "./get-lobby/get-lobby.uc";
import { HandleWsConnectionUseCase } from "./handle-ws-connection/handle-ws-connection.uc";
import { HandleWsDisconnectionRepository } from "./handle-ws-disconnection/handle-ws-disconnection.repository";
import { HandleWsDisconnectionUseCase } from "./handle-ws-disconnection/handle-ws-disconnection.uc";
import { JoinLobbyRepository } from "./join-lobby/join-lobby.repository";
import { JoinLobbyUseCase } from "./join-lobby/join-lobby.uc";
import { LeaveLobbyRepository } from "./leave-lobby/leave-lobby.repository";
import { LeaveLobbyUseCase } from "./leave-lobby/leave-lobby.uc";
import { ListenLobbiesUpdatesUseCase } from "./listen-lobbies-updates/listen-lobbies-updates.uc";
import { LobbyPrivateController } from "./lobby.private-controller";
import { LobbyPublisherGateway } from "./lobby.publisher-gateway";
import { LobbySubscriberGateway } from "./lobby.subscriber-gateway";
import { PickGameMasterRepository } from "./pick-game-master/pick-game-master.repository";
import { PickGameMasterUseCase } from "./pick-game-master/pick-game-master.uc";
import { PickHeroRepository } from "./pick-hero/pick-hero.repository";
import { PickHeroUseCase } from "./pick-hero/pick-hero.uc";
import { BackupRepository } from "./services/backup/backup.repository";
import { BackupService } from "./services/backup/backup.service";
import { SeatManagerRepository } from "./services/seat-manager/seat-manager.repository";
import { SeatManagerService } from "./services/seat-manager/seat-manager.service";
import { StartGameRepository } from "./start-game/start-game.repository";
import { StartGameUseCase } from "./start-game/start-game.uc";
import { TogglePlayerReadyStateRepository } from "./toggle-player-ready-state/toggle-player-ready-state.repository";
import { TogglePlayerReadyStateUseCase } from "./toggle-player-ready-state/toggle-player-ready-state.uc";

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forFeature([Campaign, CampaignStage, Hero]),
    RedisModule,
    ConfigModule,
  ],
  controllers: [LobbyPrivateController],
  providers: [
    HandleWsConnectionUseCase,
    HandleWsDisconnectionUseCase,
    HandleWsDisconnectionRepository,
    CreateLobbyUseCase,
    CreateLobbyRepository,
    GetLobbiesUseCase,
    GetLobbiesRepository,
    GetLobbyUseCase,
    GetLobbyRepository,
    JoinLobbyUseCase,
    JoinLobbyRepository,
    ListenLobbiesUpdatesUseCase,
    LeaveLobbyUseCase,
    LeaveLobbyRepository,
    PickHeroUseCase,
    PickHeroRepository,
    DiscardHeroUseCase,
    DiscardHeroRepository,
    TogglePlayerReadyStateUseCase,
    TogglePlayerReadyStateRepository,
    StartGameUseCase,
    StartGameRepository,
    GameInitializationDoneListener,
    SeatManagerService,
    SeatManagerRepository,
    PickGameMasterUseCase,
    PickGameMasterRepository,
    DiscardGameMasterUseCase,
    DiscardGameMasterRepository,
    LobbySubscriberGateway,
    LobbyPublisherGateway,
    BackupService,
    BackupRepository,
  ],
})
export class LobbyModule {}
