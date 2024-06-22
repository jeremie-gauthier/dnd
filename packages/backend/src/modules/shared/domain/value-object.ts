export abstract class ValueObject<Data> {
  protected readonly _data: Data;

  constructor(data: Data) {
    this._data = data;
  }

  public abstract equals(other: ValueObject<Data>): boolean;
}
