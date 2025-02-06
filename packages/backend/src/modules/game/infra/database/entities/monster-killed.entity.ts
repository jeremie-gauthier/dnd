import { Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { Game } from "./game.entity";
import { MonsterTemplate } from "./playable-entity-template/monster-template.entity";
import { HeroEntity } from "./playable-entity/hero.entity";
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

  @ManyToOne(() => Game)
  readonly game: Relation<Game>;
}
