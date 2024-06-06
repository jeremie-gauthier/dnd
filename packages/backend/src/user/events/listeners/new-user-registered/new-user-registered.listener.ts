import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { AuthEvent } from "src/auth/events/emitters/auth-event.enum";
import type { NewUserRegisteredPayload } from "src/auth/events/emitters/new-user-registered.payload";
import { UserStatus } from "src/database/enums/user-status.enum";
import { NewUserCreatedPayload } from "../../emitters/new-user-created.payload";
import { UserEvent } from "../../emitters/user-event.enum";
import { NewUserRegisteredRepository } from "./new-user-registered.repository";

@Injectable()
export class NewUserRegisteredListener {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: NewUserRegisteredRepository,
  ) {}

  @OnEvent(AuthEvent.NewUserRegistered)
  public async handler({
    userId,
    avatarUrl,
    username,
  }: NewUserRegisteredPayload) {
    const newUser = await this.repository.createNewUser({
      id: userId,
      status: UserStatus.CREATED,
      avatarUrl,
      username,
    });

    this.eventEmitter.emitAsync(
      UserEvent.NewUserCreated,
      new NewUserCreatedPayload({ userId: newUser.id }),
    );
  }
}
