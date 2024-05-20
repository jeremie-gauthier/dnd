import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InitiativeService } from "src/game/timeline/services/initiative/initiative.service";
import { GameEvent } from "../../emitters/game-events.enum";
import { UpdateTimelineRepository } from "./update-timeline.repository";

@Injectable()
export class UpdateTimelineListener {
  constructor(
    private readonly repository: UpdateTimelineRepository,
    private readonly initiativeService: InitiativeService,
  ) {}

  @OnEvent(GameEvent.EntityDied)
  @OnEvent(GameEvent.InitiativesRerolled)
  public async handler({ game }: { game: GameEntity }) {
    this.initiativeService.updateTimelineFromPlayableEntities({ game });
    await this.repository.updateGame({ game });
  }
}
