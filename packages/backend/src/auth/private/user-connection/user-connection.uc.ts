import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UseCase } from 'src/types/use-case.interface';
import { UserEvent } from 'src/user/events/events.type';
import { UserConnectionRepository } from './user-connection.repository';

@Injectable()
export class UserConnectionUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: UserConnectionRepository,
  ) {}

  public async execute({ userId }: { userId: string }): Promise<void> {
    const shouldSetupUserEnvironment = await this.repository.shouldSetupUserEnvironment(userId);
    if (shouldSetupUserEnvironment) {
      this.eventEmitter.emit(UserEvent.NewUserRegistered, {
        name: UserEvent.NewUserRegistered,
        userId,
      });
    }
  }
}
