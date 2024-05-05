import { Coord, TileEntity } from "../game";

type Entity = Coord &
  Pick<
    Extract<
      TileEntity,
      {
        type:
          | "non-playable-non-interactive-entity"
          | "non-playable-interactive-entity";
      }
    >,
    "kind"
  >;

export type MapCompiledJson = {
  height: number;
  width: number;
  startingPositions: Coord[];
  entities: Entity[];
};
