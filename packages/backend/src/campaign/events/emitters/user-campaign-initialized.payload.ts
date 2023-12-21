import { EventPayload } from 'src/event-emitter/event-payload.class';
import { CampaignEvent } from './campaign-events.enum';

export class UserCampaignInitializedPayload extends EventPayload<CampaignEvent.UserCampaignsInitialized> {
  public readonly userId: string;

  constructor({ userId }: Omit<UserCampaignInitializedPayload, 'name'>) {
    super();
    this.userId = userId;
  }
}
