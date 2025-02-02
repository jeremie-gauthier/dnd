import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
import { z } from "zod";
import { TileEntity } from "../tile-entity.abstract";

type Data = {
  readonly type: "NON_INTERACTIVE_ENTITY";
  readonly kind: "off-map" | "pillar" | "tree" | "wall";
  readonly isBlocking: boolean;
  readonly isVisible: boolean;
};

export class TileNonInteractiveEntity extends TileEntity<Data> {
  private static readonly schema = z.object({
    type: z
      .literal(TileEntityType.NON_INTERACTIVE_ENTITY)
      .default(TileEntityType.NON_INTERACTIVE_ENTITY),
    kind: z.enum(["off-map", "pillar", "tree", "wall"]),
    isBlocking: z.boolean(),
    isVisible: z.boolean(),
  });

  constructor(rawData: Omit<Data, "type">) {
    const data = TileNonInteractiveEntity.schema.parse(rawData);
    super(data);
  }

  public override toPlain() {
    return {
      type: this._data.type,
      kind: this._data.kind,
      isBlocking: this._data.isBlocking,
      isVisible: this._data.isVisible,
    };
  }
}
