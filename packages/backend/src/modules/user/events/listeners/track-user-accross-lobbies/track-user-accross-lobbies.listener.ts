import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { LobbyEvent } from "src/modules/lobby/events/emitters/lobby-event.enum";
import type { UserJoinedLobbyPayload } from "src/modules/lobby/events/emitters/user-joined-lobby.payload";
import { UserLeftLobbyPayload } from "src/modules/lobby/events/emitters/user-left-lobby.payload";
import { TrackUserAccrossLobbiesRepository } from "./track-user-accross-lobbies.repository";

@Injectable()
export class TrackUserAccrossLobbiesListener {
  constructor(private readonly repository: TrackUserAccrossLobbiesRepository) {}

  @OnEvent(LobbyEvent.UserJoinedLobby)
  @OnEvent(LobbyEvent.UserLeftLobby)
  public async handler(payload: UserJoinedLobbyPayload | UserLeftLobbyPayload) {
    if (this.isAJoinLobbyEvent(payload)) {
      await this.repository.saveUserLobby(payload);
    } else {
      await this.repository.removeUserLobby(payload);
    }
  }

  private isAJoinLobbyEvent(
    payload: UserJoinedLobbyPayload | UserLeftLobbyPayload,
  ): payload is UserJoinedLobbyPayload {
    return payload.name === LobbyEvent.UserJoinedLobby;
  }
}
