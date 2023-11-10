import { PlayableEntity } from '../../entities/playables/playable.abstract';

export abstract class Turn {
  public isRunning = false;
  public actionPoints = 2;
  public abstract readonly playableEntity: PlayableEntity;

  public start() {
    console.log(`Turn start: ${this.playableEntity.name}`);
    this.isRunning = true;
  }

  public end() {
    console.log(`Turn end: ${this.playableEntity.name}`);
    this.isRunning = false;
  }

  public move(...parameters: Parameters<Turn['_move']>) {
    console.log(`${this.playableEntity.name} moves`);
    this.takeAction(this._move.bind(this), ...parameters);
  }

  public attack(...parameters: Parameters<Turn['_attack']>) {
    console.log(`${this.playableEntity.name} attack`);
    this.takeAction(this._attack.bind(this), ...parameters);
  }

  protected takeAction<ActionMethod extends (...parameters: any[]) => void>(
    action: ActionMethod,
    ...parameters: Parameters<ActionMethod>
  ) {
    try {
      if (this.actionPoints <= 0) {
        throw new Error('[-] Not enough action points');
      }

      this.actionPoints -= 1;
      action(...parameters);
    } catch (error) {
      this.actionPoints += 1;
      console.error(error);
    }
  }

  private _move(...parameters: Parameters<PlayableEntity['move']>) {
    this.playableEntity.move(...parameters);
  }

  private _attack(...parameters: Parameters<PlayableEntity['attack']>) {
    this.playableEntity.attack(...parameters);
  }
}
