import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
  RelationId,
} from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class ItemUI {
  @PrimaryColumn()
  @RelationId((itemUI: ItemUI) => itemUI.item)
  readonly itemName: Relation<Item["name"]>;

  @OneToOne(() => Item, { nullable: false })
  @JoinColumn()
  readonly item: Item;

  @Column({ update: false })
  readonly imgUrl: string;
}
