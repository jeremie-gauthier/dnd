import type { Campaign } from "src/database/entities/campaign.entity";
import type { User } from "src/database/entities/user.entity";
import type { EventPayload } from "src/interfaces/event-payload.interface";
import { CampaignEvent } from "./campaign-event.enum";

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
