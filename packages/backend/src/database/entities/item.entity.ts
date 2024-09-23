import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";

@Entity()
@TableInheritance({ column: "type" })
export class Item {
  @PrimaryColumn()
  readonly name: string;

  @Column({ update: false })
  readonly type: "Weapon" | "Spell" | "ChestTrap" | "Potion" | "Artifact";

  @Column({ update: false })
  readonly level: number;

  @Column({ update: false })
  readonly isLootableInChest: boolean;
}
