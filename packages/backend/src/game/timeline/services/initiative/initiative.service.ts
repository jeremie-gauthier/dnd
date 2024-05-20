import { GameEntity, PlayableEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { InitiativesRerolledPayload } from "src/game/events/emitters/initiatives-rerolled.payload";

@Injectable()
export class InitiativeService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public updateTimelineFromPlayableEntities({
    game,
  }: { game: GameEntity }): void {
    const playableEntities = Object.values(game.playableEntities);
    game.timeline = this.getTimelineFromPlayableEntities({ playableEntities });
  }

  public rollPlayableEntitiesInitiative({ game }: { game: GameEntity }) {
    const playableEntities = Object.values(game.playableEntities);
    for (const playableEntity of playableEntities) {
      playableEntity.initiative = this.roll();
    }

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
