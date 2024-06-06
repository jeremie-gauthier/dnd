import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AuthEvent } from "../auth/events/auth-event.enum";
import { NewUserRegisteredPayload } from "../auth/events/new-user-registered.payload";
import { LobbyEvent } from "../lobby/events/lobby-event.enum";
import { UserJoinedLobbyPayload } from "../lobby/events/user-joined-lobby.payload";
import { UserLeftLobbyPayload } from "../lobby/events/user-left-lobby.payload";
import { NewUserRegisteredUseCase } from "./new-user-registered/new-user-registered.uc";
import { TrackUserAccrossLobbiesUseCase } from "./track-user-accross-lobbies/track-user-accross-lobbies.uc";

@Injectable()
export class UserListeners {
  constructor(
    private readonly trackUserAccrossLobbiesUseCase: TrackUserAccrossLobbiesUseCase,
    private readonly newUserRegisteredUseCase: NewUserRegisteredUseCase,
  ) {}

  @OnEvent(LobbyEvent.UserJoinedLobby)
  @OnEvent(LobbyEvent.UserLeftLobby)
  public async gameInitializationDone(
    payload: UserJoinedLobbyPayload | UserLeftLobbyPayload,
  ) {
    await this.trackUserAccrossLobbiesUseCase.execute(payload);
  }

  @OnEvent(AuthEvent.NewUserRegistered)
  public async newUserRegistered(payload: NewUserRegisteredPayload) {
    await this.newUserRegisteredUseCase.execute(payload);
  }
}
