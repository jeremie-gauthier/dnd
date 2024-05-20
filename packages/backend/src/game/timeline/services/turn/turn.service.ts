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
    const playableEntities = Object.values(game.playableEntities);
    if (this.isEveryoneDead({ playableEntities })) {
      return;
    }

    const relativeTimeline = this.getRelativeTimeline({ game });
    const nextEntityIdToPlay = relativeTimeline.find(
      (entityId) =>
        game.playableEntities[entityId] &&
        game.playableEntities[entityId]!.characteristic.healthPoints > 0,
    );
    if (!nextEntityIdToPlay) {
      return;
    }

    return game.playableEntities[nextEntityIdToPlay];
  }

  private getRelativeTimeline({
    game,
  }: { game: GameEntity }): GameEntity["timeline"] {
    const playingEntity = this.getPlayingEntity({ game });
    if (!playingEntity) {
      return game.timeline;
    }

    const playingEntityIdx = game.timeline.findIndex(
      (id) => id === playingEntity.id,
    );

    return [
      ...game.timeline.slice(playingEntityIdx + 1),
      ...game.timeline.slice(0, playingEntityIdx + 1),
    ];
  }

  private isEveryoneDead({
    playableEntities,
  }: { playableEntities: PlayableEntity[] }): boolean {
    return playableEntities.every(
      (playableEntity) => playableEntity.characteristic.healthPoints <= 0,
    );
  }

  public endPlayableEntityTurn({
    playableEntity,
  }: { playableEntity: PlayableEntity }): void {
    playableEntity.currentPhase = "idle";
    playableEntity.actionsDoneThisTurn = [];
  }

  public startPlayableEntityTurn({
    playableEntity,
  }: { playableEntity: PlayableEntity }): void {
    playableEntity.currentPhase = "action";
    playableEntity.characteristic.actionPoints =
      playableEntity.characteristic.baseActionPoints;
  }
}
