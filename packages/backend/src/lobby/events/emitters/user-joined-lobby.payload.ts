import { LobbyEntity } from '@dnd/shared';
import { User } from 'src/database/entities/user.entity';
import { EventPayload } from 'src/event-emitter/event-payload.class';
import { ServerSocket } from 'src/types/socket.type';
import { LobbyEvent } from './lobby-events.enum';

export class UserJoinedLobbyPayload extends EventPayload<LobbyEvent.UserJoinedLobby> {
  public readonly client: ServerSocket;
  public readonly userId: User['id'];
  public readonly lobbyId: LobbyEntity['id'];

  constructor({ client, userId, lobbyId }: Omit<UserJoinedLobbyPayload, 'name'>) {
    super();
    this.client = client;
    this.userId = userId;
    this.lobbyId = lobbyId;
  }
}
