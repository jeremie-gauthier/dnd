import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DoorOpenedPayload } from "src/game/events/emitters/door-opened.payload";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { TurnService } from "src/game/timeline/services/turn/turn.service";
import { EndPlayingEntityTurnRepository } from "./end-playing-entity-turn.repository";

@Injectable()
export class EndPlayingEntityTurnListener {
  constructor(
    private readonly repository: EndPlayingEntityTurnRepository,
    private readonly turnService: TurnService,
  ) {}

  @OnEvent(GameEvent.DoorOpened)
  public async handler(payload: DoorOpenedPayload) {
    this.turnService.endPlayableEntityTurn({
      playableEntity: payload.entityThatOpenedTheDoor,
    });

    await this.repository.updateGame({ game: payload.game });
  }
}
