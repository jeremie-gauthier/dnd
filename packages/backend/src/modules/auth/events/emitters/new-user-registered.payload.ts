import type { EventPayload } from "src/shared/event-payload.abstract";
import { AuthEvent } from "./auth-event.enum";

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
