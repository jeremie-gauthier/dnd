import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { GameBoardDeserialized } from "src/modules/shared/interfaces/game-board-deserialized.interface";
import { GameEventDeserialized } from "src/modules/shared/interfaces/game-events-deserialized.interface";
import { GameRoomsDeserialized } from "src/modules/shared/interfaces/game-rooms-deserialized.interface";
import { GameWinConditionsDeserialized } from "src/modules/shared/interfaces/game-win-conditions-deserialized.interface";
import { CampaignEvent } from "./campaign-event.enum";

export class GameInitializationDonePayload
  implements EventPayload<CampaignEvent.GameInitializationDone>
{
  public readonly name = CampaignEvent.GameInitializationDone;
  public readonly campaignStageProgression: CampaignStageProgression;
  public readonly enemyTemplates: EnemyTemplate[];
  public readonly events: Array<GameEventDeserialized>;
  public readonly lobby: ReturnType<Lobby["toPlain"]>;
  public readonly map: GameBoardDeserialized;
  public readonly winConditions: GameWinConditionsDeserialized;
  public readonly rooms: GameRoomsDeserialized;

  constructor({
    campaignStageProgression,
    enemyTemplates,
    events,
    lobby,
    map,
    winConditions,
    rooms,
  }: Omit<GameInitializationDonePayload, "name">) {
    this.campaignStageProgression = campaignStageProgression;
    this.enemyTemplates = enemyTemplates;
    this.lobby = lobby;
    this.events = events;
    this.map = map;
    this.winConditions = winConditions;
    this.rooms = rooms;
  }
}
