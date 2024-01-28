import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NewUserCreatedPayload } from 'src/user/events/emitters/new-user-created.payload';
import { UserEvent } from 'src/user/events/emitters/user-events.enum';
import { CampaignEvent } from '../../emitters/campaign-events.enum';
import { UnlockCampaignForUserPayload } from '../../emitters/unlock-campaign-for-user.payload';
import { InitializeNewUserRepository } from './initialize-new-user.repository';

@Injectable()
export class InitializeNewUserListener {
  constructor(
    private readonly emitter: EventEmitter2,
    private readonly repository: InitializeNewUserRepository,
  ) {}

  @OnEvent(UserEvent.NewUserCreated)
  public async handler({ userId }: NewUserCreatedPayload) {
    const campaignsForNewUsers = await this.repository.getAvailableCampaignsForNewUsers();
    console.log(campaignsForNewUsers);

    await Promise.all(
      campaignsForNewUsers.map((campaign) =>
        this.emitter.emitAsync(
          CampaignEvent.UnlockCampaignForUser,
          new UnlockCampaignForUserPayload({
            userId,
            campaignId: campaign.id,
          }),
        ),
      ),
    );
  }
}
