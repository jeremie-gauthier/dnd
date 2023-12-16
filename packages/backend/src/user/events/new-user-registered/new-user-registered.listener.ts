import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserEvent } from '../events.type';
import { NewUserRegisteredPayload } from './new-user-registered.payload';
import { NewUserRegisteredRepository } from './new-user-registered.repository';

@Injectable()
export class NewUserRegisteredListener {
  constructor(private readonly repository: NewUserRegisteredRepository) {}

  @OnEvent(UserEvent.NewUserRegistered)
  public async handler(payload: NewUserRegisteredPayload) {
    await this.repository.createNewUser(payload.userId);
  }
}
