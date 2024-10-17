import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class PlayableEntityTookDamagePayload
  implements EventPayload<GameEvent.PlayableEntityTookDamage>
{
  public readonly name = GameEvent.PlayableEntityTookDamage;
  public readonly game: ReturnType<Game["toPlain"]>;
  public readonly target: ReturnType<Playable["toPlain"]>;
  public readonly amount: number;

  constructor({
    game,
    target,
    amount,
  }: Omit<PlayableEntityTookDamagePayload, "name">) {
    this.game = game;
    this.target = target;
    this.amount = amount;
  }
}
