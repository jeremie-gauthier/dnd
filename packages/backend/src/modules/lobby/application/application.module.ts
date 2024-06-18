import { Module } from "@nestjs/common";
import { DatabaseModule } from "../infra/database/database.module";
import { LobbyListeners } from "./lobby.listeners";
import { CreateLobbyUseCase } from "./use-cases/create-lobby/create-lobby.uc";
import { DiscardPlayableCharacterUseCase } from "./use-cases/discard-playable-character/discard-playable-character.uc";
import { GameInitializationDoneUseCase } from "./use-cases/game-initialization-done/game-initialization-done.uc";
import { GetLobbiesUseCase } from "./use-cases/get-lobbies/get-lobbies.uc";
import { GetLobbyUseCase } from "./use-cases/get-lobby/get-lobby.uc";
import { HandleWsConnectionUseCase } from "./use-cases/handle-ws-connection/handle-ws-connection.uc";
import { HandleWsDisconnectionUseCase } from "./use-cases/handle-ws-disconnection/handle-ws-disconnection.uc";
import { JoinLobbyUseCase } from "./use-cases/join-lobby/join-lobby.uc";
import { LeaveLobbyUseCase } from "./use-cases/leave-lobby/leave-lobby.uc";
import { ListenLobbiesUpdatesUseCase } from "./use-cases/listen-lobbies-updates/listen-lobbies-updates.uc";
import { ListenLobbyUpdatesUseCase } from "./use-cases/listen-lobby-updates/listen-lobby-updates.uc";
import { PickPlayableCharacterUseCase } from "./use-cases/pick-playable-character/pick-playable-character.uc";
import { StartGameUseCase } from "./use-cases/start-game/start-game.uc";
import { TogglePlayerReadyStateUseCase } from "./use-cases/toggle-player-ready-state/toggle-player-ready-state.uc";

@Module({
  imports: [DatabaseModule],
  providers: [
    LobbyListeners,
    HandleWsConnectionUseCase,
    HandleWsDisconnectionUseCase,
    CreateLobbyUseCase,
    GetLobbiesUseCase,
    GetLobbyUseCase,
    JoinLobbyUseCase,
    ListenLobbiesUpdatesUseCase,
    ListenLobbyUpdatesUseCase,
    LeaveLobbyUseCase,
    PickPlayableCharacterUseCase,
    DiscardPlayableCharacterUseCase,
    TogglePlayerReadyStateUseCase,
    StartGameUseCase,
    GameInitializationDoneUseCase,
  ],
  exports: [
    LobbyListeners,
    HandleWsConnectionUseCase,
    HandleWsDisconnectionUseCase,
    CreateLobbyUseCase,
    GetLobbiesUseCase,
    GetLobbyUseCase,
    JoinLobbyUseCase,
    ListenLobbiesUpdatesUseCase,
    ListenLobbyUpdatesUseCase,
    LeaveLobbyUseCase,
    PickPlayableCharacterUseCase,
    DiscardPlayableCharacterUseCase,
    TogglePlayerReadyStateUseCase,
    StartGameUseCase,
    GameInitializationDoneUseCase,
  ],
})
export class ApplicationModule {}
