import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzModule } from 'src/authz/authz.module';
import { Campaign } from 'src/database/entities/campaign.entity';
import { RedisModule } from 'src/redis/redis.module';
import { LobbiesChangesListener } from './events/listeners/lobbies-changes/lobbies-changes.listener';
import { LobbiesChangesRepository } from './events/listeners/lobbies-changes/lobbies-changes.repository';
import { LobbyCleanerListener } from './events/listeners/lobby-cleaner/lobby-cleaner.listener';
import { LobbyCleanerRepository } from './events/listeners/lobby-cleaner/lobby-cleaner.repository';
import { RoomManagerListener } from './events/listeners/room-manager/room-manager.listener';
import { CreateLobbyRepository } from './private/create-lobby/create-lobby.repository';
import { CreateLobbyUseCase } from './private/create-lobby/create-lobby.uc';
import { GetLobbiesRepository } from './private/get-lobbies/get-lobbies.repository';
import { GetLobbiesUseCase } from './private/get-lobbies/get-lobbies.uc';
import { HandleWsConnectionUseCase } from './private/handle-ws-connection/handle-ws-connection.uc';
import { HandleWsDisconnectionRepository } from './private/handle-ws-disconnection/handle-ws-disconnection.repository';
import { HandleWsDisconnectionUseCase } from './private/handle-ws-disconnection/handle-ws-disconnection.uc';
import { JoinLobbyRepository } from './private/join-lobby/join-lobby.repository';
import { JoinLobbyUseCase } from './private/join-lobby/join-lobby.uc';
import { ListenLobbiesChangesUseCase } from './private/listen-lobbies-changes/listen-lobbies-changes.uc';
import { LobbyPrivateController } from './private/lobby-private.controller';
import { LobbyPrivateGateway } from './private/lobby-private.gateway';

@Module({
  imports: [AuthzModule, TypeOrmModule.forFeature([Campaign]), RedisModule],
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
    JoinLobbyUseCase,
    JoinLobbyRepository,
    ListenLobbiesChangesUseCase,
    LobbiesChangesListener,
    LobbiesChangesRepository,
    LobbyCleanerListener,
    LobbyCleanerRepository,
    RoomManagerListener,
  ],
})
export class LobbyModule {}
