import { Injectable } from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import { LobbyEvent } from "src/modules/lobby/events/lobby-event.enum";
import type { UserJoinedLobbyPayload } from "src/modules/lobby/events/user-joined-lobby.payload";
import { UserLeftLobbyPayload } from "src/modules/lobby/events/user-left-lobby.payload";
import { TrackUserAccrossLobbiesRepository } from "./track-user-accross-lobbies.repository";

@Injectable()
export class TrackUserAccrossLobbiesUseCase implements UseCase {
  constructor(private readonly repository: TrackUserAccrossLobbiesRepository) {}

  public async execute(payload: UserJoinedLobbyPayload | UserLeftLobbyPayload) {
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
