import { HeroClassType, HeroClassValues } from "@dnd/shared";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Characteristic } from "./characteristic";

export class PlayableEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  readonly name: string;

  @Column({ type: "enum", enum: HeroClassValues, nullable: false })
  readonly class: HeroClassType;

  @Column({ nullable: false })
  readonly level: number;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;
}
