import { User } from 'src/database/entities/user.entity';
import { EventPayload } from 'src/event-emitter/event-payload.class';
import { LobbyEvent } from './lobby-events.enum';

export class UserJoinedLobbyPayload extends EventPayload<LobbyEvent.UserJoinedLobby> {
  public readonly userId: User['id'];
  public readonly lobbyId: string;

  constructor({ userId, lobbyId }: Omit<UserJoinedLobbyPayload, 'name'>) {
    super();
    this.userId = userId;
    this.lobbyId = lobbyId;
  }
}
