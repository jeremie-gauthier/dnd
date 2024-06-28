import { randomUUID } from "node:crypto";

type Data = {
  [x: string]: any;
};

export abstract class Entity<T extends Data> {
  private readonly _id: string;

  constructor(
    protected readonly _data: T,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
  }

  public get id() {
    return this._id;
  }

  public equals(other: Entity<T>): boolean {
    if (this === other) {
      return true;
    }

    if (!(other instanceof Entity)) {
      return false;
    }

    return this.id === other.id;
  }
}
