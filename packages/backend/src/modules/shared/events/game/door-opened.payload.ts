import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class DoorOpenedPayload implements EventPayload<GameEvent.DoorOpened> {
  public readonly name = GameEvent.DoorOpened;
  public readonly entityThatOpenedTheDoor: ReturnType<Playable["toPlain"]>;
  public readonly game: ReturnType<Game["toPlain"]>;

  constructor({
    entityThatOpenedTheDoor,
    game,
  }: Omit<DoorOpenedPayload, "name">) {
    this.entityThatOpenedTheDoor = entityThatOpenedTheDoor;
    this.game = game;
  }
}
