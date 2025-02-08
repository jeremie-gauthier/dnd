import {
  NonInteractiveEntityKind,
  NonInteractiveEntityKindType,
} from "src/modules/game/infra/database/enums/non-interactive-entity-kind.enum";
import { EntityType } from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { z } from "zod";
import { TileEntity } from "../tile-entity.abstract";

type Data = {
  readonly type: "NON_INTERACTIVE_ENTITY";
  readonly kind: NonInteractiveEntityKindType;
  readonly isBlocking: boolean;
  readonly isVisible: boolean;
};

export class TileNonInteractiveEntity extends TileEntity<Data> {
  private static readonly schema = z.object({
    type: z
      .literal(EntityType.NON_INTERACTIVE_ENTITY)
      .default(EntityType.NON_INTERACTIVE_ENTITY),
    kind: z.enum([
      NonInteractiveEntityKind.OFF_MAP,
      NonInteractiveEntityKind.PILLAR,
      NonInteractiveEntityKind.TREE,
      NonInteractiveEntityKind.WALL,
    ]),
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
