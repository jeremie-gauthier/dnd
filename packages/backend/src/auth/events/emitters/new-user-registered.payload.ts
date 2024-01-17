import { EventPayload } from 'src/event-emitter/event-payload.class';
import { AuthEvent } from './auth-events.enum';

export class NewUserRegisteredPayload implements EventPayload<AuthEvent.NewUserRegistered> {
  public readonly name = AuthEvent.NewUserRegistered;
  public readonly userId: string;

  constructor({ userId }: Omit<NewUserRegisteredPayload, 'name'>) {
    this.userId = userId;
  }
}
