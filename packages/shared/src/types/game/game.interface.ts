/* eslint-disable @typescript-eslint/consistent-type-definitions */

type PlayableEntity = {
  id: string;
  playedByUserId: string;
};

type Coord = {
  x: number;
  y: number;
};

type Tile = {
  coord: Coord;
  entities: PlayableEntity['id'][];
};

type Map = {
  width: number;
  height: number;
  tiles: Tile[];
};

export type GameEntity = {
  id: string;
  map: Map;
  playableEntities: PlayableEntity[];
  timeline: PlayableEntity['id'][];
};
