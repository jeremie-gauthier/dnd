import { EnemyKind } from "@dnd/shared";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Inventory } from "../inventory/inventory.entity";

type Data = {
  readonly kind: EnemyKind;
  readonly characteristic: {
    readonly baseHealthPoints: number;
    readonly baseManaPoints: number;
    readonly baseArmorClass: number;
    readonly baseMovementPoints: number;
    readonly baseActionPoints: number;
  };
  readonly inventory: Inventory;
};

export class MonsterTemplate extends Entity<Data> {
  private static schema = z.object({
    kind: z.enum(["goblin"]),
    characteristic: z.object({
      baseHealthPoints: z.number(),
      baseManaPoints: z.number(),
      baseArmorClass: z.number(),
      baseMovementPoints: z.number(),
      baseActionPoints: z.number(),
    }),
    inventory: z.instanceof(Inventory),
  });

  constructor(rawData: Data) {
    const data = MonsterTemplate.schema.parse(rawData);
    super(data, data.kind);
  }

  public equals(other: MonsterTemplate): boolean {
    return (
      this._data.kind === other._data.kind &&
      this._data.inventory.equals(other._data.inventory) &&
      this._data.characteristic.baseHealthPoints ===
        other._data.characteristic.baseHealthPoints &&
      this._data.characteristic.baseManaPoints ===
        other._data.characteristic.baseManaPoints &&
      this._data.characteristic.baseArmorClass ===
        other._data.characteristic.baseArmorClass &&
      this._data.characteristic.baseMovementPoints ===
        other._data.characteristic.baseMovementPoints &&
      this._data.characteristic.baseActionPoints ===
        other._data.characteristic.baseActionPoints
    );
  }

  public toPlain() {
    return {
      kind: this._data.kind,
      characteristic: this._data.characteristic,
      inventory: this._data.inventory.toPlain(),
    };
  }
}
