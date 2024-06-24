import { Entity } from "./entity";

type Data = {
  [x: string]: any;
};

export class List<T extends Entity<Data>> {
  constructor(private items: T[]) {}

  public get length() {
    return this.items.length;
  }

  public get values() {
    return this.items;
  }

  [Symbol.iterator]() {
    return this.items.values();
  }

  public find({ id }: { id: T["id"] }) {
    return this.items.find((item) => id === item.id);
  }

  public findOrThrow({ id }: { id: T["id"] }) {
    const item = this.find({ id });
    if (!item) {
      throw new Error("Item not found in List");
    }
    return item;
  }

  public add(item: T) {
    this.items.push(item);
  }

  public remove({ id }: { id: T["id"] }) {
    this.items = this.items.filter((item) => id !== item.id);
  }
}
