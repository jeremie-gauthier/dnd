import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { AuthEvent } from "src/auth/events/emitters/auth-events.enum";
import { NewUserRegisteredPayload } from "src/auth/events/emitters/new-user-registered.payload";
import { NewUserCreatedPayload } from "../../emitters/new-user-created.payload";
import { UserEvent } from "../../emitters/user-events.enum";
import { NewUserRegisteredRepository } from "./new-user-registered.repository";

@Injectable()
export class NewUserRegisteredListener {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: NewUserRegisteredRepository,
  ) {}

  @OnEvent(AuthEvent.NewUserRegistered)
  public async handler(payload: NewUserRegisteredPayload) {
    const newUser = await this.repository.createNewUser(payload.userId);

    this.eventEmitter.emitAsync(
      UserEvent.NewUserCreated,
      new NewUserCreatedPayload({ userId: newUser.id }),
    );
  }
}
