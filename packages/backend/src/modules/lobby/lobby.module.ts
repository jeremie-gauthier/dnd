import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthzModule } from "src/modules/authz/authz.module";
import { RedisModule } from "src/redis/redis.module";
import { BackupRepository } from "./domain/backup/backup.repository";
import { BackupService } from "./domain/backup/backup.service";
import { RoleService } from "./domain/role/role.service";
import { SeatManagerRepository } from "./domain/seat-manager/seat-manager.repository";
import { SeatManagerService } from "./domain/seat-manager/seat-manager.service";
import { LobbyListeners } from "./infra/controller/lobby.listeners";
import { LobbyPrivateController } from "./infra/controller/lobby.private-controller";
import { LobbyPublisherGateway } from "./infra/controller/lobby.publisher-gateway";
import { LobbySubscriberGateway } from "./infra/controller/lobby.subscriber-gateway";
import { LobbiesRepository } from "./infra/database/lobbies.repository";
import { UsersRepository } from "./infra/database/users.repository";
import { CreateLobbyRepository } from "./use-cases/create-lobby/create-lobby.repository";
import { CreateLobbyUseCase } from "./use-cases/create-lobby/create-lobby.uc";
import { DiscardGameMasterUseCase } from "./use-cases/discard-game-master/discard-game-master.uc";
import { DiscardHeroUseCase } from "./use-cases/discard-hero/discard-hero.uc";
import { GameInitializationDoneUseCase } from "./use-cases/game-initialization-done/game-initialization-done.uc";
import { GetLobbiesRepository } from "./use-cases/get-lobbies/get-lobbies.repository";
import { GetLobbiesUseCase } from "./use-cases/get-lobbies/get-lobbies.uc";
import { GetLobbyUseCase } from "./use-cases/get-lobby/get-lobby.uc";
import { HandleWsConnectionUseCase } from "./use-cases/handle-ws-connection/handle-ws-connection.uc";
import { HandleWsDisconnectionUseCase } from "./use-cases/handle-ws-disconnection/handle-ws-disconnection.uc";
import { JoinLobbyUseCase } from "./use-cases/join-lobby/join-lobby.uc";
import { LeaveLobbyUseCase } from "./use-cases/leave-lobby/leave-lobby.uc";
import { ListenLobbiesUpdatesUseCase } from "./use-cases/listen-lobbies-updates/listen-lobbies-updates.uc";
import { ListenLobbyUpdatesUseCase } from "./use-cases/listen-lobby-updates/listen-lobby-updates.uc";
import { PickGameMasterUseCase } from "./use-cases/pick-game-master/pick-game-master.uc";
import { PickHeroUseCase } from "./use-cases/pick-hero/pick-hero.uc";
import { StartGameUseCase } from "./use-cases/start-game/start-game.uc";
import { TogglePlayerReadyStateUseCase } from "./use-cases/toggle-player-ready-state/toggle-player-ready-state.uc";

@Module({
  imports: [AuthzModule, ConfigModule, RedisModule],
  controllers: [LobbyPrivateController],
  providers: [
    LobbiesRepository,
    UsersRepository,
    LobbyListeners,
    HandleWsConnectionUseCase,
    HandleWsDisconnectionUseCase,
    CreateLobbyUseCase,
    CreateLobbyRepository,
    GetLobbiesUseCase,
    GetLobbiesRepository,
    GetLobbyUseCase,
    JoinLobbyUseCase,
    ListenLobbiesUpdatesUseCase,
    ListenLobbyUpdatesUseCase,
    LeaveLobbyUseCase,
    PickHeroUseCase,
    DiscardHeroUseCase,
    TogglePlayerReadyStateUseCase,
    StartGameUseCase,
    GameInitializationDoneUseCase,
    SeatManagerService,
    SeatManagerRepository,
    PickGameMasterUseCase,
    DiscardGameMasterUseCase,
    LobbySubscriberGateway,
    LobbyPublisherGateway,
    BackupService,
    BackupRepository,
    RoleService,
  ],
})
export class LobbyModule {}
