import { GameEntity, PlayableEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GameEvent } from "src/modules/game/events/game-event.enum";
import { InitiativesRerolledPayload } from "src/modules/game/events/initiatives-rerolled.payload";

@Injectable()
export class InitiativeService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public rollPlayableEntitiesInitiative({ game }: { game: GameEntity }) {
    const playableEntities = Object.values(game.playableEntities);
    for (const playableEntity of playableEntities) {
      playableEntity.initiative = this.roll();
    }

    game.timeline = this.getTimelineFromPlayableEntities({ playableEntities });

    this.eventEmitter.emitAsync(
      GameEvent.InitiativesRerolled,
      new InitiativesRerolledPayload({ game }),
    );
  }

  private roll(): number {
    return Math.round(Math.random() * 100);
  }

  private getTimelineFromPlayableEntities({
    playableEntities,
  }: { playableEntities: PlayableEntity[] }): GameEntity["timeline"] {
    return playableEntities
      .sort((a, b) => b.initiative - a.initiative)
      .map(({ id }) => id);
  }
}
