import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserStatus } from "src/database/enums/user-status.enum";
import { UseCase } from "src/interfaces/use-case.interface";
import type { NewUserRegisteredPayload } from "src/modules/auth/events/new-user-registered.payload";
import { NewUserCreatedPayload } from "../events/new-user-created.payload";
import { UserEvent } from "../events/user-event.enum";
import { NewUserRegisteredRepository } from "./new-user-registered.repository";

@Injectable()
export class NewUserRegisteredUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: NewUserRegisteredRepository,
  ) {}

  public async execute({
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
