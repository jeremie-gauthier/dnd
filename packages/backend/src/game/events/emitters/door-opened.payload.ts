import {
  GameEntity,
  PlayableEntity,
  TileNonPlayableInteractiveEntity,
} from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { MessageContext } from "src/types/socket.type";
import { GameEvent } from "./game-events.enum";

export class DoorOpenedPayload implements EventPayload<GameEvent.DoorOpened> {
  public readonly name = GameEvent.DoorOpened;
  public readonly ctx: MessageContext;
  public readonly doorEntity: TileNonPlayableInteractiveEntity;
  public readonly entityThatOpenedTheDoor: PlayableEntity;
  public readonly game: GameEntity;

  constructor({
    ctx,
    doorEntity,
    entityThatOpenedTheDoor,
    game,
  }: Omit<DoorOpenedPayload, "name">) {
    this.ctx = ctx;
    this.doorEntity = doorEntity;
    this.entityThatOpenedTheDoor = entityThatOpenedTheDoor;
    this.game = game;
  }
}
