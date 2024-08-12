import { Plainable } from "src/interfaces/plainable.interface";

export abstract class ValueObject<TData> implements Plainable<TData> {
  protected readonly _data: TData;

  constructor(data: TData) {
    this._data = data;
  }

  public abstract equals(other: ValueObject<TData>): boolean;
  public abstract toPlain(): TData;
}
