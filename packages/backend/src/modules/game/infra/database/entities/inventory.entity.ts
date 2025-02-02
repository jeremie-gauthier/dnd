import { Item } from "./item/item.entity";

export class StuffStorageCapacity {
  nbArtifactSlots: number;
  nbSpellSlots: number;
  nbWeaponSlots: number;
  nbBackpackSlots: number;
}

export class Inventory {
  storageCapacity: StuffStorageCapacity;
  gear: Array<Item>;
  backpack: Array<Item>;
}
