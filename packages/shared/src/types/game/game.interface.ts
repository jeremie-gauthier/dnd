/* eslint-disable @typescript-eslint/consistent-type-definitions */

export type TilePlayableEntity = {
  type: 'playable-entity';
  id: string;
};

export type TileNonPlayableInteractiveEntity = {
  type: 'non-playable-interactive-entity';
  kind: 'door' | 'trap';
  isVisible: boolean;
  isBlocking: boolean;
  canInteract: boolean;
};

export type TileNonPlayableNonInteractiveEntity = {
  type: 'non-playable-non-interactive-entity';
  kind: 'wall' | 'pillar' | 'tree' | 'off-map';
  isVisible: true;
  isBlocking: true;
  canInteract: false;
};

export type TileEntity =
  | TilePlayableEntity
  | TileNonPlayableInteractiveEntity
  | TileNonPlayableNonInteractiveEntity;

export type Coord = {
  x: number;
  y: number;
};

export type Tile = {
  coord: Coord;
  entities: TileEntity[];
  isStartingTile?: true;
};

export type Map = {
  width: number;
  height: number;
  tiles: Tile[];
};

export type PlayableEntity = {
  id: string;
  playedByUserId: string;
};

export type GameEntity = {
  id: string;
  map: Map;
  playableEntities: Record<PlayableEntity['id'], PlayableEntity>;
  timeline: PlayableEntity['id'][];
};
