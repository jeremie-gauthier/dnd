import { EventPayload } from "src/interfaces/event-payload.interface";
import { CampaignStage } from "src/modules/campaign/infra/database/entities/campaign-stage.entity";
import { Campaign } from "src/modules/campaign/infra/database/entities/campaign.entity";
import { HeroEntity } from "src/modules/game/infra/database/entities/playable-entity/hero.entity";
import { RequestCreateLobbyPayload } from "src/modules/shared/events/lobby/request-create-lobby.payload";
import { CampaignEvent } from "./campaign-event.enum";

export class RequestCreateLobbyFulfilledPayload
  implements EventPayload<CampaignEvent.RequestCreateLobbyFulfilled>
{
  public readonly name = CampaignEvent.RequestCreateLobbyFulfilled;
  public readonly campaign: Campaign;
  public readonly config: RequestCreateLobbyPayload["config"];
  public readonly heroes: HeroEntity[];
  public readonly selectedStage: CampaignStage;
  public readonly userId: string;

  constructor({
    campaign,
    config,
    heroes,
    selectedStage,
    userId,
  }: Omit<RequestCreateLobbyFulfilledPayload, "name">) {
    this.campaign = campaign;
    this.config = config;
    this.heroes = heroes;
    this.selectedStage = selectedStage;
    this.userId = userId;
  }
}
