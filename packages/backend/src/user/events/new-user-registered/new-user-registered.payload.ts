import { EventPayload } from 'src/types/event-payload.interface';
import { UserEvent } from '../events.type';

export interface NewUserRegisteredPayload extends EventPayload<UserEvent.NewUserRegistered> {
  userId: string;
}
