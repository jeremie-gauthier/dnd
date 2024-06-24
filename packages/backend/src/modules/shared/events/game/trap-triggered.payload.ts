import { GameEntity, PlayableEntity } from "@dnd/shared";
import { TrapEntity } from "@dnd/shared/dist/database/game/interactive-entities.type";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { GameEvent } from "./game-event.enum";

export class TrapTriggeredPayload
  implements EventPayload<GameEvent.TrapTriggered>
{
  public readonly name = GameEvent.TrapTriggered;
  public readonly game: GameEntity;
  public readonly trapEntity: TrapEntity;
  public readonly subjectEntity: PlayableEntity;

  constructor({
    game,
    trapEntity,
    subjectEntity,
  }: Omit<TrapTriggeredPayload, "name">) {
    this.game = game;
    this.trapEntity = trapEntity;
    this.subjectEntity = subjectEntity;
  }
}
