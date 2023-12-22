import { EventPayload } from 'src/event-emitter/event-payload.class';
import { AuthEvent } from './auth-events.enum';

export class NewUserRegisteredPayload extends EventPayload<AuthEvent.NewUserRegistered> {
  public readonly userId: string;

  constructor({ userId }: Omit<NewUserRegisteredPayload, 'name'>) {
    super();
    this.userId = userId;
  }
}
