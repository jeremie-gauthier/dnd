import { UserConnectionInput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { AuthEvent } from "src/modules/auth/events/emitters/auth-event.enum";
import { NewUserRegisteredPayload } from "src/modules/auth/events/emitters/new-user-registered.payload";
import { UserConnectionRepository } from "./user-connection.repository";

@Injectable()
export class UserConnectionUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: UserConnectionRepository,
  ) {}

  public async execute({
    userId,
    avatarUrl,
    username,
  }: UserConnectionInput & { userId: User["id"] }): Promise<void> {
    const shouldSetupUserEnvironment =
      await this.repository.shouldSetupUserEnvironment(userId);
    if (shouldSetupUserEnvironment) {
      this.eventEmitter.emitAsync(
        AuthEvent.NewUserRegistered,
        new NewUserRegisteredPayload({ userId, avatarUrl, username }),
      );
    }
  }
}
