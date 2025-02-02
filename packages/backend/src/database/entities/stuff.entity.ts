import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import {
  StorageSpaceType,
  StorageSpaceValues,
} from "../enums/storage-space.enum";
import { Hero } from "./hero.entity";
import { Item } from "./item.entity";

@Entity()
export class Stuff {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: StorageSpaceValues, nullable: false })
  storageSpace: StorageSpaceType;

  @ManyToOne(() => Item, { onDelete: "CASCADE", nullable: false })
  item: Relation<Item>;

  @ManyToOne(() => Hero, { onDelete: "CASCADE", nullable: false })
  hero: Relation<Hero>;
}
