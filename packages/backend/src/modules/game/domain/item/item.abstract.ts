import { Entity } from "src/modules/shared/domain/entity";

type Data = {
  readonly id: string;
  readonly type: "Weapon" | "Spell";
  readonly name: string;
  readonly level: number;
  [x: string]: unknown;
};

export abstract class Item<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  public abstract use(_: unknown): void;

  constructor(rawData: ChildData) {
    super(rawData, rawData.id);
  }

  get type() {
    return this._data.type;
  }
}
