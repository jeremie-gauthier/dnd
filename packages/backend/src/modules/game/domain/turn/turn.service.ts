import { GameEntity, PlayableEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class TurnService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

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
    game,
    playableEntity,
  }: { game: GameEntity; playableEntity: PlayableEntity }): void {
    playableEntity.currentPhase = "idle";
    playableEntity.actionsDoneThisTurn = [];

    // this.eventEmitter.emitAsync(
    //   GameEvent.PlayableEntityTurnEnded,
    //   new PlayableEntityTurnEndedPayload({ game, playableEntity }),
    // );
  }

  public startPlayableEntityTurn({
    game,
    playableEntity,
  }: { game: GameEntity; playableEntity: PlayableEntity }): void {
    playableEntity.currentPhase = "action";
    playableEntity.characteristic.actionPoints =
      playableEntity.characteristic.baseActionPoints;

    // this.eventEmitter.emitAsync(
    //   GameEvent.PlayableEntityTurnStarted,
    //   new PlayableEntityTurnStartedPayload({
    //     game,
    //     playableEntity,
    //   }),
    // );
  }

  public restartTimeline({ game }: { game: GameEntity }) {
    const nextEntityToPlay = this.getNextEntityToPlay({ game });
    if (!nextEntityToPlay) {
      return;
    }

    this.startPlayableEntityTurn({ game, playableEntity: nextEntityToPlay });
  }
}
