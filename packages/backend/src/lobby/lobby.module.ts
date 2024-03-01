import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { RedisModule } from "src/redis/redis.module";
import { LobbiesChangesListener } from "./events/listeners/lobbies-changes/lobbies-changes.listener";
import { LobbiesChangesRepository } from "./events/listeners/lobbies-changes/lobbies-changes.repository";
import { LobbyChangedListener } from "./events/listeners/lobby-changed/lobby-changed.listener";
import { LobbyChangedRepository } from "./events/listeners/lobby-changed/lobby-changed.repository";
import { LobbyCleanerListener } from "./events/listeners/lobby-cleaner/lobby-cleaner.listener";
import { LobbyCleanerRepository } from "./events/listeners/lobby-cleaner/lobby-cleaner.repository";
import { RoomManagerListener } from "./events/listeners/room-manager/room-manager.listener";
import { CreateLobbyRepository } from "./private/create-lobby/create-lobby.repository";
import { CreateLobbyUseCase } from "./private/create-lobby/create-lobby.uc";
import { DiscardHeroRepository } from "./private/discard-hero/discard-hero.repository";
import { DiscardHeroUseCase } from "./private/discard-hero/discard-hero.uc";
import { GetLobbiesRepository } from "./private/get-lobbies/get-lobbies.repository";
import { GetLobbiesUseCase } from "./private/get-lobbies/get-lobbies.uc";
import { GetLobbyRepository } from "./private/get-lobby/get-lobby.repository";
import { GetLobbyUseCase } from "./private/get-lobby/get-lobby.uc";
import { HandleWsConnectionUseCase } from "./private/handle-ws-connection/handle-ws-connection.uc";
import { HandleWsDisconnectionRepository } from "./private/handle-ws-disconnection/handle-ws-disconnection.repository";
import { HandleWsDisconnectionUseCase } from "./private/handle-ws-disconnection/handle-ws-disconnection.uc";
import { JoinLobbyRepository } from "./private/join-lobby/join-lobby.repository";
import { JoinLobbyUseCase } from "./private/join-lobby/join-lobby.uc";
import { LeaveLobbyRepository } from "./private/leave-lobby/leave-lobby.repository";
import { LeaveLobbyUseCase } from "./private/leave-lobby/leave-lobby.uc";
import { ListenLobbiesChangesUseCase } from "./private/listen-lobbies-changes/listen-lobbies-changes.uc";
import { LobbyPrivateController } from "./private/lobby-private.controller";
import { LobbyPrivateGateway } from "./private/lobby-private.gateway";
import { PickHeroRepository } from "./private/pick-hero/pick-hero.repository";
import { PickHeroUseCase } from "./private/pick-hero/pick-hero.uc";
import { StartGameRepository } from "./private/start-game/start-game.repository";
import { StartGameUseCase } from "./private/start-game/start-game.uc";
import { TogglePlayerReadyStateRepository } from "./private/toggle-player-ready-state/toggle-player-ready-state.repository";
import { TogglePlayerReadyStateUseCase } from "./private/toggle-player-ready-state/toggle-player-ready-state.uc";

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forFeature([Campaign, CampaignStage]),
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
    JoinLobbyRepository,
    ListenLobbiesChangesUseCase,
    LobbiesChangesListener,
    LobbiesChangesRepository,
    LobbyCleanerListener,
    LobbyCleanerRepository,
    RoomManagerListener,
    LeaveLobbyUseCase,
    LeaveLobbyRepository,
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
  ],
})
export class LobbyModule {}
