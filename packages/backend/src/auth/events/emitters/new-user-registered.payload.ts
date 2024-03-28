import type { EventPayload } from "src/event-emitter/event-payload.class";
import { AuthEvent } from "./auth-events.enum";

export class NewUserRegisteredPayload
  implements EventPayload<AuthEvent.NewUserRegistered>
{
  public readonly name = AuthEvent.NewUserRegistered;
  public readonly userId: string;
  public readonly avatarUrl: string;
  public readonly username: string;

  constructor({
    userId,
    avatarUrl,
    username,
  }: Omit<NewUserRegisteredPayload, "name">) {
    this.userId = userId;
    this.avatarUrl = avatarUrl;
    this.username = username;
  }
}
