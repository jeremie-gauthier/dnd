import { StorageSpaceType } from "../enums/storage-space.enum";

class StuffStorageCapacityTemplate {
  readonly nbArtifactSlots: number;
  readonly nbSpellSlots: number;
  readonly nbWeaponSlots: number;
  readonly nbBackpackSlots: number;
}

class ItemTemplate {
  readonly storageSpace: StorageSpaceType;
  readonly itemName: string;
}

export class InventoryTemplate {
  readonly storageCapacity: StuffStorageCapacityTemplate;
  readonly items: Array<ItemTemplate>;
}
