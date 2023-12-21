import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthEvent } from 'src/auth/events/emitters/auth-events.enum';
import { NewUserRegisteredPayload } from 'src/auth/events/emitters/new-user-registered.payload';
import { NewUserRegisteredRepository } from './new-user-registered.repository';

@Injectable()
export class NewUserRegisteredListener {
  constructor(private readonly repository: NewUserRegisteredRepository) {}

  @OnEvent(AuthEvent.NewUserRegistered)
  public async handler(payload: NewUserRegisteredPayload) {
    await this.repository.createNewUser(payload.userId);
  }
}
