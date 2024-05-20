import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DoorOpenedPayload } from "src/game/events/emitters/door-opened.payload";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { InitiativeService } from "src/game/timeline/services/initiative/initiative.service";
import { TurnService } from "src/game/timeline/services/turn/turn.service";
import { RerollInitiativesRepository } from "./reroll-initiatives.repository";

@Injectable()
export class RerollInitiativesListener {
  constructor(
    private readonly repository: RerollInitiativesRepository,
    private readonly turnService: TurnService,
    private readonly initiativeService: InitiativeService,
  ) {}

  @OnEvent(GameEvent.DoorOpened)
  public async handler({ game }: DoorOpenedPayload) {
    this.initiativeService.rollPlayableEntitiesInitiative({ game });

    this.restartTimeline({ game });

    await this.repository.updateGame({ game });
  }

  private restartTimeline({ game }: { game: GameEntity }) {
    const nextEntityToPlay = this.turnService.getNextEntityToPlay({ game });
    if (!nextEntityToPlay) {
      return;
    }

    this.turnService.startPlayableEntityTurn({
      playableEntity: nextEntityToPlay,
    });
  }
}
