export interface ItemUIRepository {
  createMany(data: {
    items: Array<{ itemName: string; imgUrl: string }>;
  }): Promise<void>;
}

export const ITEM_UI_REPOSITORY = Symbol("ItemUIRepository");
