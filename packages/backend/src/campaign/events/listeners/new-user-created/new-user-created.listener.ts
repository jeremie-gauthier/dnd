import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserStatus } from 'src/database/entities/user.entity';
import { NewUserCreatedPayload } from 'src/user/events/emitters/new-user-created.payload';
import { UserEvent } from 'src/user/events/emitters/user-events.enum';
import { CampaignEvent } from '../../emitters/campaign-events.enum';
import { UserCampaignInitializedPayload } from '../../emitters/user-campaign-initialized.payload';
import { NewUserCreatedRepository } from './new-user-created.repository';

@Injectable()
export class NewUserRegisteredListener {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: NewUserCreatedRepository,
  ) {}

  @OnEvent(UserEvent.NewUserCreated)
  public async handler(payload: NewUserCreatedPayload) {
    const [user, campaigns] = await Promise.all([
      this.repository.getUserById(payload.userId),
      this.repository.getAllCampaignsWithStages(),
    ]);

    user.campaignProgressions = campaigns.map(this.repository.createCampaignProgression);
    user.status = UserStatus.INITIALIZED;

    await this.repository.updateUser(user);

    this.eventEmitter.emitAsync(
      CampaignEvent.UserCampaignsInitialized,
      new UserCampaignInitializedPayload({ userId: payload.userId }),
    );
  }
}
