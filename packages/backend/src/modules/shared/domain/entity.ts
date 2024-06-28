import { randomUUID } from "node:crypto";
import { Plainable } from "src/interfaces/plainable.interface";
import { type ValueObject } from "./value-object";

type Data = {
  [x: string]: any;
};

type PlainData<TData extends Data> = {
  [key in keyof TData]: TData[key] extends Entity<any> | ValueObject<any>
    ? ReturnType<TData[key]["toPlain"]>
    : TData[key] extends Array<infer ArrayItem>
      ? ArrayItem extends ValueObject<any> | Entity<any>
        ? PlainData<ArrayItem["toPlain"]>
        : ArrayItem
      : TData[key];
};

export abstract class Entity<T extends Data>
  implements Plainable<PlainData<T>>
{
  private readonly _id: string;
  public abstract toPlain(): PlainData<T>;

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
