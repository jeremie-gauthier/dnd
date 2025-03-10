import {
  InteractiveEntityKind,
  InteractiveEntityKindType,
} from "src/modules/game/infra/database/enums/interactive-entity-kind.enum";
import {
  NonInteractiveEntityKind,
  NonInteractiveEntityKindType,
} from "src/modules/game/infra/database/enums/non-interactive-entity-kind.enum";
import {
  EntityType,
  EntityTypeType,
} from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { z } from "zod";
import { TileEntity } from "../tile-entity.abstract";

type Data = {
  readonly type: EntityTypeType;
  readonly kind: InteractiveEntityKindType | NonInteractiveEntityKindType;
  readonly isBlocking: boolean;
  readonly canInteract: boolean;
};

export class TileNonPlayableEntity extends TileEntity<Data> {
  private static readonly schema = z.object({
    type: z.enum([
      EntityType.NON_INTERACTIVE_ENTITY,
      EntityType.INTERACTIVE_ENTITY,
    ]),
    kind: z.enum([
      InteractiveEntityKind.CHEST,
      InteractiveEntityKind.DOOR,
      InteractiveEntityKind.TRAP,
      NonInteractiveEntityKind.OFF_MAP,
      NonInteractiveEntityKind.PILLAR,
      NonInteractiveEntityKind.TREE,
      NonInteractiveEntityKind.WALL,
    ]),
    isBlocking: z.boolean(),
    canInteract: z.boolean(),
  });

  constructor(rawData: Data) {
    const data = TileNonPlayableEntity.schema.parse(rawData);
    super(data);
  }

  //#region Getters

  public get kind() {
    return this._data.kind;
  }

  public get canInteract() {
    return this._data.canInteract;
  }

  // #region Methods

  public isTrap(): boolean {
    return this._data.kind === InteractiveEntityKind.TRAP;
  }

  public override toPlain() {
    return {} as any;
  }
}
