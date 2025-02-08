import { Column, PrimaryColumn, Relation } from "typeorm";
import { HeroTemplate } from "./hero-template.entity";
import { MonsterTemplate } from "./monster-template.entity";

export abstract class PlayableEntityTemplateUI<
  TPlayableEntityTemplate extends MonsterTemplate | HeroTemplate,
> {
  @PrimaryColumn("uuid")
  readonly id: string;

  abstract readonly playableEntityTemplate: Relation<TPlayableEntityTemplate>;

  @Column({ update: false })
  readonly imgUrl: string;
}
