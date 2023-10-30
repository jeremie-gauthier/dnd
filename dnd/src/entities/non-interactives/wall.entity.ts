import { NonInteractive } from './non-interactive.interface';

export class Wall extends NonInteractive {
  public readonly name = 'Wall';
  public readonly type = 'wall';
  public readonly isPlayable = false;
  public readonly isBlocking = true;
}
