import { GameEntity, PlayableEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InitiativeService {
  public rollPlayableEntitiesInitiative({ game }: { game: GameEntity }) {
    const playableEntities = Object.values(game.playableEntities);
    for (const playableEntity of playableEntities) {
      playableEntity.initiative = this.roll();
    }

    game.timeline = this.getTimelineFromPlayableEntities({ playableEntities });
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
