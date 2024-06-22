import { UserConnectionInput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UserStatus } from "src/database/enums/user-status.enum";
import type { UseCase } from "src/interfaces/use-case.interface";
import { NewUserCreatedPayload } from "../../events/new-user-created.payload";
import { UserEvent } from "../../events/user-event.enum";
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
    const user = await this.repository.getUser({ userId });
    if (!user) {
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
}
