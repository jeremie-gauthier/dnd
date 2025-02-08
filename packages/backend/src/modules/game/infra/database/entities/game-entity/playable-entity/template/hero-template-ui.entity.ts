import { Entity, ManyToOne, Relation } from "typeorm";
import { HeroTemplate } from "./hero-template.entity";
import { PlayableEntityTemplateUI } from "./playable-entity-template-ui.entity";

@Entity()
export class HeroTemplateUI extends PlayableEntityTemplateUI<HeroTemplate> {
  @ManyToOne(() => HeroTemplate)
  override readonly playableEntityTemplate: Relation<HeroTemplate>;
}
