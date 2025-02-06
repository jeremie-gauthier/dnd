import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import {
  ConditionNameType,
  ConditionNameValues,
} from "../enums/condition-name.enum";
import { PlayableEntity } from "./playable-entity/playable-entity.entity";

@Entity()
export class PlayableEntityCondition {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({
    type: "enum",
    enum: ConditionNameValues,
    enumName: "ConditionName",
    update: false,
  })
  readonly name: ConditionNameType;

  @Column()
  readonly remainingTurns: number;

  @ManyToOne(
    () => PlayableEntity,
    (playableEntity) => playableEntity.conditions,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly playableEntity: Relation<PlayableEntity>;
}
