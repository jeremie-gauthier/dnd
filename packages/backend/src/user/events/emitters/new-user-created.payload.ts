import type { EventPayload } from "src/event-emitter/event-payload.class";
import { UserEvent } from "./user-events.enum";

export class NewUserCreatedPayload
  implements EventPayload<UserEvent.NewUserCreated>
{
  public readonly name = UserEvent.NewUserCreated;
  public readonly userId: string;

  constructor({ userId }: Omit<NewUserCreatedPayload, "name">) {
    this.userId = userId;
  }
}
