import { Column } from "typeorm";

export class StorageCapacity {
  @Column()
  readonly nbArtifactSlots: number;

  @Column()
  readonly nbSpellSlots: number;

  @Column()
  readonly nbWeaponSlots: number;

  @Column()
  readonly nbBackpackSlots: number;
}
