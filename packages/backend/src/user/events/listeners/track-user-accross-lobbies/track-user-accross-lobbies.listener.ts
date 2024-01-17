import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { UserJoinedLobbyPayload } from 'src/lobby/events/emitters/user-joined-lobby.payload';
import { TrackUserAccrossLobbiesRepository } from './track-user-accross-lobbies.repository';

@Injectable()
export class TrackUserAccrossLobbiesListener {
  constructor(private readonly repository: TrackUserAccrossLobbiesRepository) {}

  @OnEvent(LobbyEvent.UserJoinedLobby)
  public async handler(payload: UserJoinedLobbyPayload) {
    await this.repository.saveUserLobby(payload);
  }
}
