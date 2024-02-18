/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { TileEntity } from './tile-entity.interface';

type Coord = {
  x: number;
  y: number;
};

type ReachableTile = {
  coord: Coord;
  type: 'reachable-tile';
  entities: TileEntity[];
  isStartingTile?: true;
};

type UnreachableTile = {
  coord: Coord;
  type: 'unreachable-tile';
  kind: 'wall' | 'pillar' | 'tree' | 'off-map';
};

export type Tile = ReachableTile | UnreachableTile;
