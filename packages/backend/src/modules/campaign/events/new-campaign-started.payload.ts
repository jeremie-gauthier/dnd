import type { EventPayload } from "src/interfaces/event-payload.interface";
import type { CampaignProgression } from "src/modules/campaign/infra/database/entities/campaign-progression.entity";
import type { Campaign } from "src/modules/campaign/infra/database/entities/campaign.entity";
import { User } from "src/modules/user/infra/database/entities/user.entity";
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
