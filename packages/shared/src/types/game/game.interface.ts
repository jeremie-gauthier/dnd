/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { Tile } from './tile.interface';

type Map = {
  width: number;
  height: number;
  tiles: Tile[];
};

type PlayableEntity = {
  id: string;
  playedByUserId: string;
};

export type GameEntity = {
  id: string;
  map: Map;
  playableEntities: Record<PlayableEntity['id'], PlayableEntity>;
  timeline: PlayableEntity['id'][];
};
