import { PrivateUserConnectionInput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AuthEvent } from "src/auth/events/emitters/auth-events.enum";
import { NewUserRegisteredPayload } from "src/auth/events/emitters/new-user-registered.payload";
import { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { PrivateUserConnectionRepository } from "./private-user-connection.repository";

@Injectable()
export class PrivateUserConnectionUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: PrivateUserConnectionRepository,
  ) {}

  public async execute({
    userId,
    avatarUrl,
    username,
  }: PrivateUserConnectionInput & { userId: User["id"] }): Promise<void> {
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
