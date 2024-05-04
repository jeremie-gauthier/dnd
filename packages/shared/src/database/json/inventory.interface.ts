import { StorageSpaceType } from "../enums/storage-space.enum";
import { StuffStorageCapacityJson } from "./stuff-storage-capacity.interface";

export type InventoryJson = {
  storageCapacity: StuffStorageCapacityJson;
  items: {
    storageSpace: StorageSpaceType;
    itemName: string;
  }[];
};
