import { NonInteractive } from './non-interactive.interface';

export class Pillar implements NonInteractive {
  public readonly type = 'pillar';

  public getRepresentation() {
    return 'This is a Pillar';
  }
}
