import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { Hero } from "src/database/entities/hero.entity";
import { RedisModule } from "src/redis/redis.module";
import { CreateLobbyRepository } from "./create-lobby/create-lobby.repository";
import { CreateLobbyUseCase } from "./create-lobby/create-lobby.uc";
import { DiscardHeroRepository } from "./discard-hero/discard-hero.repository";
import { DiscardHeroUseCase } from "./discard-hero/discard-hero.uc";
import { GameInitializationDoneListener } from "./events/listeners/game-initialization-done/game-initialization-done.listener";
import { GameInitializationDoneRepository } from "./events/listeners/game-initialization-done/game-initialization-done.repository";
import { LobbiesChangesListener } from "./events/listeners/lobbies-changes/lobbies-changes.listener";
import { LobbiesChangesRepository } from "./events/listeners/lobbies-changes/lobbies-changes.repository";
import { LobbyChangedListener } from "./events/listeners/lobby-changed/lobby-changed.listener";
import { LobbyChangedRepository } from "./events/listeners/lobby-changed/lobby-changed.repository";
import { LobbyCleanerListener } from "./events/listeners/lobby-cleaner/lobby-cleaner.listener";
import { LobbyCleanerRepository } from "./events/listeners/lobby-cleaner/lobby-cleaner.repository";
import { RoomManagerListener } from "./events/listeners/room-manager/room-manager.listener";
import { GetLobbiesRepository } from "./get-lobbies/get-lobbies.repository";
import { GetLobbiesUseCase } from "./get-lobbies/get-lobbies.uc";
import { GetLobbyRepository } from "./get-lobby/get-lobby.repository";
import { GetLobbyUseCase } from "./get-lobby/get-lobby.uc";
import { HandleWsConnectionUseCase } from "./handle-ws-connection/handle-ws-connection.uc";
import { HandleWsDisconnectionRepository } from "./handle-ws-disconnection/handle-ws-disconnection.repository";
import { HandleWsDisconnectionUseCase } from "./handle-ws-disconnection/handle-ws-disconnection.uc";
import { JoinLobbyUseCase } from "./join-lobby/join-lobby.uc";
import { LeaveLobbyUseCase } from "./leave-lobby/leave-lobby.uc";
import { ListenLobbiesChangesUseCase } from "./listen-lobbies-changes/listen-lobbies-changes.uc";
import { LobbyPrivateController } from "./lobby.private-controller";
import { LobbyPrivateGateway } from "./lobby.private-gateway";
import { PickHeroRepository } from "./pick-hero/pick-hero.repository";
import { PickHeroUseCase } from "./pick-hero/pick-hero.uc";
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
  ],
  controllers: [LobbyPrivateController],
  providers: [
    LobbyPrivateGateway,
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
    ListenLobbiesChangesUseCase,
    LobbiesChangesListener,
    LobbiesChangesRepository,
    LobbyCleanerListener,
    LobbyCleanerRepository,
    RoomManagerListener,
    LeaveLobbyUseCase,
    LobbyChangedListener,
    LobbyChangedRepository,
    PickHeroUseCase,
    PickHeroRepository,
    DiscardHeroUseCase,
    DiscardHeroRepository,
    TogglePlayerReadyStateUseCase,
    TogglePlayerReadyStateRepository,
    StartGameUseCase,
    StartGameRepository,
    GameInitializationDoneListener,
    GameInitializationDoneRepository,
    SeatManagerService,
    SeatManagerRepository,
  ],
})
export class LobbyModule {}
