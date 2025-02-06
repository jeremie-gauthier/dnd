import { EventPayload } from "src/interfaces/event-payload.interface";
import { CampaignStageProgression } from "src/modules/campaign/infra/database/entities/campaign-stage-progression.entity";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { CampaignEvent } from "./campaign-event.enum";

export class GameInitializationDonePayload
  implements EventPayload<CampaignEvent.GameInitializationDone>
{
  public readonly name = CampaignEvent.GameInitializationDone;
  public readonly campaignStageProgression: CampaignStageProgression;
  public readonly lobby: ReturnType<Lobby["toPlain"]>;

  constructor({
    campaignStageProgression,
    lobby,
  }: Omit<GameInitializationDonePayload, "name">) {
    this.campaignStageProgression = campaignStageProgression;
    this.lobby = lobby;
  }
}
