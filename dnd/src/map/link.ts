import type { Tile } from './tile';

export class Link {
  static Type = {
    None: 'none',
    Door: 'door',
  };

  constructor(
    public readonly tile: Tile,
    public readonly type = Link.Type.None,
    public readonly status = 'closed',
  ) {
    if (this.type === Link.Type.None) {
      this.status = 'open';
    }
  }
}
