import { PlayableEntity } from '../../entities/playables/playable.abstract';

export abstract class Turn {
  public isRunning = false;
  protected abstract readonly playableEntity: PlayableEntity;

  public start() {
    console.log(`Turn start: ${this.playableEntity.name}`);
    this.isRunning = true;
  }

  public end() {
    console.log(`Turn end: ${this.playableEntity.name}`);
    this.isRunning = false;
  }
}
