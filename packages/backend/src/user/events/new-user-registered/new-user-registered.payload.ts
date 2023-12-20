import { EventPayload } from 'src/event-emitter/event-payload.class';
import { UserEvent } from '../events.type';

export class NewUserRegisteredPayload extends EventPayload<UserEvent.NewUserRegistered> {
  public readonly userId: string;

  constructor({ userId }: Omit<NewUserRegisteredPayload, 'name'>) {
    super();
    this.userId = userId;
  }
}
