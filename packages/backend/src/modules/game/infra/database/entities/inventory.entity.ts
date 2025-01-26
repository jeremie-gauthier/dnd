import { Item } from "./item/item.entity";

export type StuffStorageCapacityJson = {
  nbArtifactSlots: number;
  nbSpellSlots: number;
  nbWeaponSlots: number;
  nbBackpackSlots: number;
};

export class Inventory {
  storageCapacity: StuffStorageCapacityJson;
  gear: Array<Item>;
  backpack: Array<Item>;
}
