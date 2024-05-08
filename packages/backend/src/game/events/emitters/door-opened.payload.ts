import {
  Coord,
  GameEntity,
  PlayableEntity,
  TileNonPlayableInteractiveEntity,
} from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class DoorOpenedPayload implements EventPayload<GameEvent.DoorOpened> {
  public readonly name = GameEvent.DoorOpened;
  public readonly doorEntity: TileNonPlayableInteractiveEntity;
  public readonly doorCoord: Coord;
  public readonly entityThatOpenedTheDoor: PlayableEntity;
  public readonly game: GameEntity;

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
