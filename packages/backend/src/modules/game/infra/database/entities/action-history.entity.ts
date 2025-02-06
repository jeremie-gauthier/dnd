import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { ActionNameType, ActionNameValues } from "../enums/action-name.enum";
import { PlayableEntity } from "./playable-entity/playable-entity.entity";

@Entity()
export class ActionHistory {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({
    type: "enum",
    enum: ActionNameValues,
    enumName: "ActionName",
    update: false,
  })
  readonly name: ActionNameType;

  @ManyToOne(
    () => PlayableEntity,
    (playableEntity) => playableEntity.actionsDoneThisTurn,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly playableEntity: Relation<PlayableEntity>;
}
