import type { EventPayload } from "src/interfaces/event-payload.interface";
import { UserEvent } from "./user-event.enum";

export class NewUserCreatedPayload
  implements EventPayload<UserEvent.NewUserCreated>
{
  public readonly name = UserEvent.NewUserCreated;
  public readonly userId: string;

  constructor({ userId }: Omit<NewUserCreatedPayload, "name">) {
    this.userId = userId;
  }
}
