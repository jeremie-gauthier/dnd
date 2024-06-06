import type { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import type { Campaign } from "src/database/entities/campaign.entity";
import type { User } from "src/database/entities/user.entity";
import type { EventPayload } from "src/shared/event-payload.abstract";
import { CampaignEvent } from "./campaign-event.enum";

export class NewCampaignStartedPayload
  implements EventPayload<CampaignEvent.NewCampaignStarted>
{
  public readonly name = CampaignEvent.NewCampaignStarted;
  public readonly userId: User["id"];
  public readonly campaignId: Campaign["id"];
  public readonly campaignProgressionId: CampaignProgression["id"];

  constructor({
    userId,
    campaignId,
    campaignProgressionId,
  }: Omit<NewCampaignStartedPayload, "name">) {
    this.userId = userId;
    this.campaignId = campaignId;
    this.campaignProgressionId = campaignProgressionId;
  }
}
