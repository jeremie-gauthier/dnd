import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  Relation,
  Unique,
} from "typeorm";
import { HeroEntity } from "./game-entity/playable-entity/hero.entity";
import { Item } from "./item/item.entity";

@Entity()
@Unique(["userId", "campaignId"])
export class GameProgression {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  readonly userId: string;

  @Column()
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
