import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import { z } from "zod";
import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { ItemPerk } from "../item-perk";
import { Item } from "../item.abstract";

export type ArtifactData = {
  readonly type: "Artifact";
  readonly name: string;
  readonly level: number;
  readonly itemPerks: Array<ItemPerk>;
};

export abstract class Artifact extends Item<ArtifactData> {
  private static readonly schema = Item.baseSchema.merge(
    z.object({
      type: z.literal(ItemType.ARTIFACT).optional().default(ItemType.ARTIFACT),
    }),
  );

  constructor(rawData: Omit<ArtifactData, "type">) {
    const data = Artifact.schema.parse(rawData);
    super(data);
  }

  public abstract use(_: {
    playableEntity: Playable;
    board: Board;
  }): void;

  public override toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      itemPerks: this._data.itemPerks.map((itemPerk) => itemPerk.toPlain()),
    };
  }
}
