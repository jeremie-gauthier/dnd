import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
  RelationId,
} from "typeorm";
import { Perk } from "./perk.entity";

@Entity()
export class PerkUI {
  @PrimaryColumn()
  @RelationId((perkUI: PerkUI) => perkUI.perk)
  readonly perkName: Relation<Perk["name"]>;

  @OneToOne(() => Perk, { nullable: false })
  @JoinColumn()
  readonly perk: Perk;

  @Column({ update: false })
  readonly iconUrl: string;
}
