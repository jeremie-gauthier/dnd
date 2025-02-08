import { Entity, ManyToOne, Relation } from "typeorm";
import { MonsterTemplate } from "./monster-template.entity";
import { PlayableEntityTemplateUI } from "./playable-entity-template-ui.entity";

@Entity()
export class MonsterTemplateUI extends PlayableEntityTemplateUI<MonsterTemplate> {
  @ManyToOne(() => MonsterTemplate)
  override readonly playableEntityTemplate: Relation<MonsterTemplate>;
}
