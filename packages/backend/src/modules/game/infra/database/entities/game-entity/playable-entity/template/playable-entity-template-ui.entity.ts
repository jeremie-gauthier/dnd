import { Column, PrimaryGeneratedColumn, Relation } from "typeorm";
import { HeroTemplate } from "./hero-template.entity";
import { MonsterTemplate } from "./monster-template.entity";

export abstract class PlayableEntityTemplateUI<
  TPlayableEntityTemplate extends MonsterTemplate | HeroTemplate,
> {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  abstract readonly playableEntityTemplate: Relation<TPlayableEntityTemplate>;

  @Column({ update: false })
  readonly imgUrl: string;
}
