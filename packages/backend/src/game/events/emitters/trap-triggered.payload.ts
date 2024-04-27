import { GameEntity, PlayableEntity } from "@dnd/shared";
import { TrapEntity } from "@dnd/shared/dist/database/game/interactive-entities.type";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

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
