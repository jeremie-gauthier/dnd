import { GameEntity } from "@dnd/shared";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { CampaignEvent } from "./campaign-event.enum";

export class GameInitializationDonePayload
  implements EventPayload<CampaignEvent.GameInitializationDone>
{
  public readonly name = CampaignEvent.GameInitializationDone;
  public readonly campaignStageProgression: CampaignStageProgression;
  public readonly enemyTemplates: EnemyTemplate[];
  public readonly events: GameEntity["events"];
  public readonly lobby: Lobby;
  public readonly map: GameEntity["map"];

  constructor({
    campaignStageProgression,
    enemyTemplates,
    events,
    lobby,
    map,
  }: Omit<GameInitializationDonePayload, "name">) {
    this.campaignStageProgression = campaignStageProgression;
    this.enemyTemplates = enemyTemplates;
    this.lobby = lobby;
    this.events = events;
    this.map = map;
  }
}
