import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import type { UserJoinedLobbyPayload } from "src/lobby/events/emitters/user-joined-lobby.payload";
import type { TrackUserAccrossLobbiesRepository } from "./track-user-accross-lobbies.repository";
import type { TrackUserAccrossLobbiesEventPayloads } from "./track-user-accross-lobbies.type";

@Injectable()
export class TrackUserAccrossLobbiesListener {
  constructor(private readonly repository: TrackUserAccrossLobbiesRepository) {}

  @OnEvent(LobbyEvent.UserJoinedLobby)
  @OnEvent(LobbyEvent.UserLeftLobby)
  @OnEvent(LobbyEvent.UserForceLeftLobby)
  public async handler(payload: TrackUserAccrossLobbiesEventPayloads) {
    if (this.isAJoinLobbyEvent(payload)) {
      await this.repository.saveUserLobby(payload);
    } else {
      await this.repository.removeUserLobby(payload);
    }
  }

  private isAJoinLobbyEvent(
    payload: TrackUserAccrossLobbiesEventPayloads,
  ): payload is UserJoinedLobbyPayload {
    return payload.name === LobbyEvent.UserJoinedLobby;
  }
}
