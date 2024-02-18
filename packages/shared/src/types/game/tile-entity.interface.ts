/* eslint-disable @typescript-eslint/consistent-type-definitions */

type TilePlayableEntity = {
  type: 'playable-entity';
  id: string;
};

type TileNonPlayableEntity = {
  type: 'non-playable-entity';
  isBlocking: boolean;
  kind: 'door' | 'trap';
  isVisible: boolean;
  canInteract: boolean;
};

export type TileEntity = TilePlayableEntity | TileNonPlayableEntity;
