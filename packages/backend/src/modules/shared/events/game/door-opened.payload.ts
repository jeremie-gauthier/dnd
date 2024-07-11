import { EventPayload } from "src/interfaces/event-payload.interface";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { Door } from "src/modules/game/domain/tile/tile-entity/interactive/door.entity";
import { GameEvent } from "./game-event.enum";

export class DoorOpenedPayload implements EventPayload<GameEvent.DoorOpened> {
  public readonly name = GameEvent.DoorOpened;
  public readonly doorEntity: ReturnType<Door["toPlain"]>;
  public readonly doorCoord: ReturnType<Coord["toPlain"]>;
  public readonly entityThatOpenedTheDoor: ReturnType<Playable["toPlain"]>;
  public readonly game: ReturnType<Game["toPlain"]>;

  constructor({
    doorEntity,
    doorCoord,
    entityThatOpenedTheDoor,
    game,
  }: Omit<DoorOpenedPayload, "name">) {
    this.doorEntity = doorEntity;
    this.doorCoord = doorCoord;
    this.entityThatOpenedTheDoor = entityThatOpenedTheDoor;
    this.game = game;
  }
}
