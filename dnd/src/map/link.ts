import type { Tile } from './tile';

export type LinkType = (typeof Link)['Type'][keyof (typeof Link)['Type']];
export type LinkStatus = (typeof Link)['Status'][keyof (typeof Link)['Status']];

export class Link {
  public static readonly Type = {
    None: 'none',
    Door: 'door',
  } as const;

  public static readonly Status = {
    Open: 'open',
    Closed: 'closed',
  } as const;

  constructor(
    public readonly tile: Tile,
    public readonly type: LinkType = Link.Type.None,
    public readonly status: LinkStatus = 'closed',
  ) {
    if (this.type === Link.Type.None) {
      this.status = 'open';
    }
  }

  public toString() {
    if (this.type === Link.Type.Door) {
      return this.status === Link.Status.Open ? 'd' : 'D';
    } else {
      return ' ';
    }
  }
}
