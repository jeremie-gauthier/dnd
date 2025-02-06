import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { Item } from "./item/item.entity";
import { HeroEntity } from "./playable-entity/hero.entity";

@Entity()
export class GameProgression {
  @PrimaryColumn()
  readonly userId: string;

  @PrimaryColumn()
  readonly campaignId: string;

  @OneToMany(
    () => HeroEntity,
    (heroEntity) => heroEntity.gameProgression,
    { cascade: true },
  )
  readonly heroes: Relation<HeroEntity[]>;

  @ManyToMany(() => Item)
  @JoinTable()
  readonly itemsLooted: Relation<Item[]>;
}
