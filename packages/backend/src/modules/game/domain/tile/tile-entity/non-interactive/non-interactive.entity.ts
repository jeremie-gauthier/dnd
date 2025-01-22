import { z } from "zod";
import { TileEntity } from "../tile-entity.abstract";

type Data = {
  readonly type: "non-interactive-entity";
  readonly kind: "off-map" | "pillar" | "tree" | "wall";
  readonly isBlocking: boolean;
  readonly isVisible: boolean;
};

export class TileNonInteractiveEntity extends TileEntity<Data> {
  private static readonly schema = z.object({
    type: z.literal("non-interactive-entity").default("non-interactive-entity"),
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
