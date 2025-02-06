import { UserRegisteredInput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { UseCase } from "src/interfaces/use-case.interface";
import { NewUserCreatedPayload } from "../../events/new-user-created.payload";
import { UserEvent } from "../../events/user-event.enum";
import { UserStatus } from "../../infra/database/enums/user-status.enum";
import { UserRegisteredRepository } from "./user-registered.repository";

@Injectable()
export class UserRegisteredUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: UserRegisteredRepository,
  ) {}

  public async execute({
    id,
    avatarUrl,
    username,
  }: UserRegisteredInput): Promise<void> {
    const newUser = await this.repository.createNewUser({
      id,
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
