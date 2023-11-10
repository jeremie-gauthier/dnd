import { NonInteractive } from './non-interactive.interface';

export class Pillar extends NonInteractive {
  public readonly name = 'Pillar';
  public readonly type = 'pillar';
  public readonly isPlayable = false;
  public readonly isBlocking = true;
}
