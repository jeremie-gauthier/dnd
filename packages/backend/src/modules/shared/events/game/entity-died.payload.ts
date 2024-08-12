import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class EntityDiedPayload implements EventPayload<GameEvent.EntityDied> {
  public readonly name = GameEvent.EntityDied;
  public readonly game: ReturnType<Game["toPlain"]>;
  public readonly target: ReturnType<Playable["toPlain"]>;

  constructor({ game, target }: Omit<EntityDiedPayload, "name">) {
    this.game = game;
    this.target = target;
  }
}
