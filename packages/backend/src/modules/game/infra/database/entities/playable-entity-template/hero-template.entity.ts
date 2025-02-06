import { Column, Entity, Index, OneToOne, Relation } from "typeorm";
import { HeroClassType, HeroClassValues } from "../../enums/hero-class.enum";
import { Inventory } from "../playable-entity/inventory.entity";
import { PlayableEntity } from "../playable-entity/playable-entity.entity";

@Entity()
@Index(["name", "class", "level"], { unique: true })
export class HeroTemplate extends PlayableEntity {
  @OneToOne(() => Inventory, { cascade: true })
  readonly inventory: Relation<Inventory>;

  @Column({ type: "enum", enum: HeroClassValues, enumName: "HeroClass" })
  readonly class: HeroClassType;

  @Column()
  readonly level: number;

  // TODO: add a relation with campaign to identify templates eligible for it
}
