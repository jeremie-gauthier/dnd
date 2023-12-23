import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { EventPayload } from 'src/event-emitter/event-payload.class';
import { CampaignEvent } from './campaign-events.enum';

export class NewCampaignStartedPayload extends EventPayload<CampaignEvent.NewCampaignStarted> {
  public readonly userId: User['id'];
  public readonly campaignId: Campaign['id'];
  public readonly campaignProgressionId: CampaignProgression['id'];

  constructor({
    userId,
    campaignId,
    campaignProgressionId,
  }: Omit<NewCampaignStartedPayload, 'name'>) {
    super();
    this.userId = userId;
    this.campaignId = campaignId;
    this.campaignProgressionId = campaignProgressionId;
  }
}
