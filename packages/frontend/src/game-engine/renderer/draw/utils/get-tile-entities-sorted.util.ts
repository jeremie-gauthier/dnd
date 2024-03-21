import type { TileEntity } from "@dnd/shared";

const orderingMap: Readonly<Record<TileEntity["type"], number>> = {
  "non-playable-non-interactive-entity": 1,
  "non-playable-interactive-entity": 2,
  "playable-entity": 3,
};

export const getTileEntitiesSorted = (entities: TileEntity[]) => {
  return [...entities].sort(
    (a, b) => orderingMap[a.type] - orderingMap[b.type],
  );
};
