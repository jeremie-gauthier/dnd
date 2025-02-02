import { Expose, Type } from "class-transformer";

export class StuffStorageCapacityResponseDto {
  readonly nbArtifactSlots: number;
  readonly nbSpellSlots: number;
  readonly nbWeaponSlots: number;
  readonly nbBackpackSlots: number;
}

export class InventoryResponseDto {
  @Expose()
  @Type(() => StuffStorageCapacityResponseDto)
  readonly storageCapacity: StuffStorageCapacityResponseDto;
}
