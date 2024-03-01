import { Campaign } from "src/database/entities/campaign.entity";
import { User } from "src/database/entities/user.entity";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { CampaignEvent } from "./campaign-events.enum";

export class UnlockCampaignForUserPayload
  implements EventPayload<CampaignEvent.UnlockCampaignForUser>
{
  public readonly name = CampaignEvent.UnlockCampaignForUser;
  public readonly userId: User["id"];
  public readonly campaignId: Campaign["id"];

  constructor({
    userId,
    campaignId,
  }: Omit<UnlockCampaignForUserPayload, "name">) {
    this.userId = userId;
    this.campaignId = campaignId;
  }
}
