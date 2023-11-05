import { NonInteractive } from './non-interactive.interface';

export class Tree extends NonInteractive {
  public readonly name = 'Tree';
  public readonly type = 'tree';
  public readonly isPlayable = false;
  public readonly isBlocking = true;
}
