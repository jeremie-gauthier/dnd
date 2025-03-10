import { Collection } from "src/interfaces/collection.interface";
import { Entity } from "../entity";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export class ArrayCollection<TEntity extends Entity<{}>>
  implements Collection<TEntity>
{
  constructor(protected values: Array<TEntity>) {}

  //#region Getters

  public get length(): number {
    return this.values.length;
  }

  // #region Methods

  public getOne(itemId: TEntity["id"]): TEntity | null {
    return this.values.find((value) => value.id === itemId) ?? null;
  }

  public getOneOrThrow(itemId: TEntity["id"]): TEntity {
    const value = this.getOne(itemId);
    if (!value) {
      throw new Error(`Item '${itemId}' not found in ArrayCollection.`);
    }
    return value;
  }

  public getOneBy(predicate: (item: TEntity) => boolean): TEntity | null {
    return this.values.find(predicate) ?? null;
  }

  public getOneByOrThrow(predicate: (item: TEntity) => boolean): TEntity {
    const value = this.getOneBy(predicate);
    if (!value) {
      throw new Error(
        "Item not found using predicate function in ArrayCollection.",
      );
    }
    return value;
  }

  public getAll(): TEntity[] {
    return this.values;
  }

  public add(item: TEntity): this {
    this.values.push(item);
    return this;
  }

  public filter(predicate: (value: TEntity) => boolean): this {
    this.values = this.values.filter(predicate);
    return this;
  }

  public at(index: number): TEntity | null {
    return this.values[index] ?? null;
  }

  public some(predicate: (value: TEntity) => boolean): boolean {
    return this.values.some(predicate);
  }
}
