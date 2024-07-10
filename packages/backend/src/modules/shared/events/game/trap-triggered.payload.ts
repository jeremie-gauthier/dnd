import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { Trap } from "src/modules/game/domain/tile-entity/interactive/trap.entity";
import { GameEvent } from "./game-event.enum";

export class TrapTriggeredPayload
  implements EventPayload<GameEvent.TrapTriggered>
{
  public readonly name = GameEvent.TrapTriggered;
  public readonly game: ReturnType<Game["toPlain"]>;
  public readonly trapEntity: ReturnType<Trap["toPlain"]>;
  public readonly subjectEntity: ReturnType<Playable["toPlain"]>;

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
