import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { GameEvent } from "./game-event.enum";

export class EntityTookDamagePayload
  implements EventPayload<GameEvent.EntityTookDamage>
{
  public readonly name = GameEvent.EntityTookDamage;
  public readonly game: GameEntity;
  public readonly target: PlayableEntity;
  public readonly amount: number;

  constructor({ game, target, amount }: Omit<EntityTookDamagePayload, "name">) {
    this.game = game;
    this.target = target;
    this.amount = amount;
  }
}
