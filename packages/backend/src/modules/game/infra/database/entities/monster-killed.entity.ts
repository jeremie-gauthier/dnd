import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { HeroEntity } from "./game-entity/playable-entity/hero.entity";
import { MonsterTemplate } from "./game-entity/playable-entity/template/monster-template.entity";
import { Room } from "./room/room.entity";

@Entity()
export class MonsterKilled {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => MonsterTemplate)
  readonly monsterTemplate: Relation<MonsterTemplate>;

  @ManyToOne(() => HeroEntity)
  readonly killer: Relation<HeroEntity>;

  @ManyToOne(() => Room)
  readonly room: Relation<Room>;

  @CreateDateColumn()
  readonly createdDate: Date;
}
