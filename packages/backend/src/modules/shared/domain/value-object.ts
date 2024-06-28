export abstract class ValueObject<TData> {
  protected readonly _data: TData;

  constructor(data: TData) {
    this._data = data;
  }

  public abstract equals(other: ValueObject<TData>): boolean;
}
