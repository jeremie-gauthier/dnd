import { randomUUID } from "node:crypto";

export class UniqueId {
  public readonly _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  public equals(other?: UniqueId): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof this.constructor)) {
      return false;
    }

    return this.id === other.id;
  }

  public toString() {
    return this.id.toString();
  }
}
