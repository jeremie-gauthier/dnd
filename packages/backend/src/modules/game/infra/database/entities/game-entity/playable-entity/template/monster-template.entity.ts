import { Entity } from "typeorm";
import { PlayableEntityTemplate } from "./playable-entity-template.entity";

@Entity()
export class MonsterTemplate extends PlayableEntityTemplate {}
