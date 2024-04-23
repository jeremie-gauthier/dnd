import { GameEntity, PlayableEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TurnService {
  public getPlayingEntity({
    game,
  }: { game: GameEntity }): PlayableEntity | undefined {
    const playableEntities = Object.values(game.playableEntities);
    return playableEntities.find(
      ({ currentPhase }) => currentPhase === "action",
    );
  }

  public getNextEntityToPlay({
    game,
  }: { game: GameEntity }): PlayableEntity | undefined {
    const playingEntity = this.getPlayingEntity({ game });

    if (playingEntity) {
      const nextEntityIdx =
        game.timeline.findIndex((id) => id === playingEntity.id) + 1;
      const nextEntityId = game.timeline[nextEntityIdx];
      if (nextEntityId) {
        return game.playableEntities[nextEntityId];
      }
    }

    const nextEntityId = game.timeline[0];
    if (nextEntityId) {
      return game.playableEntities[nextEntityId];
    }

    return undefined;
  }
}
