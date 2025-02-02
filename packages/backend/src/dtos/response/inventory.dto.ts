import { Expose, Type } from "class-transformer";

class StuffStorageCapacity {
  @Expose()
  readonly nbArtifactSlots: number;

  @Expose()
  readonly nbSpellSlots: number;

  @Expose()
  readonly nbWeaponSlots: number;

  @Expose()
  readonly nbBackpackSlots: number;
}

export class InventoryResponseDto {
  @Expose()
  @Type(() => StuffStorageCapacity)
  readonly storageCapacity: StuffStorageCapacity;
}
