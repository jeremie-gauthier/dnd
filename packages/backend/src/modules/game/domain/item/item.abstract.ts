import { Entity, PlainData } from "src/modules/shared/domain/entity";

type Data = {
  readonly type: "Weapon" | "Spell";
  readonly name: string;
  readonly level: number;
  [x: string]: unknown;
};

export abstract class Item<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  public abstract use(_: unknown): void;
  public abstract toPlain(): PlainData<ChildData>;

  constructor(rawData: ChildData) {
    super(rawData, rawData.name);
  }

  get type() {
    return this._data.type;
  }
}
