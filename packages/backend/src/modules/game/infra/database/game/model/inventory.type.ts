import { StuffStorageCapacityJson } from "@dnd/shared";
import { Item } from "./item.type";

export type Inventory = {
  storageCapacity: StuffStorageCapacityJson;
  gear: Array<Item>;
  backpack: Array<Item>;
};
