import { EventPayload } from 'src/event-emitter/event-payload.class';
import { UserEvent } from './user-events.enum';

export class NewUserCreatedPayload extends EventPayload<UserEvent.NewUserCreated> {
  public readonly userId: string;

  constructor({ userId }: Omit<NewUserCreatedPayload, 'name'>) {
    super();
    this.userId = userId;
  }
}
