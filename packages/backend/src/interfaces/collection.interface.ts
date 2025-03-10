import { Entity } from "src/modules/shared/domain/entity";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export interface Collection<TItem extends Entity<{}>> {
  get length(): number;

  getOne(itemId: TItem["id"]): TItem | null;
  getOneOrThrow(itemId: TItem["id"]): TItem;
  getOneBy(predicate: (item: TItem) => boolean): TItem | null;
  getOneByOrThrow(predicate: (item: TItem) => boolean): TItem;
  getAll(): Array<TItem>;

  add(item: TItem): this;
  filter(predicate: (value: TItem) => boolean): this;

  some(predicate: (value: TItem) => boolean): boolean;
}
