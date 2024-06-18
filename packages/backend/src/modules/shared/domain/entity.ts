import { UniqueId } from "./unique-id";

type Data = {
  [x: string]: any;
};

export abstract class Entity<T extends Data> {
  private _id: UniqueId;

  constructor(
    protected readonly _data: T,
    id?: UniqueId,
  ) {
    this._id = id ?? new UniqueId();
  }

  public get id() {
    return this._id;
  }

  public equals(other: Entity<Data>): boolean {
    return this.id.equals(other.id);
  }
}
