import { ChildEntity, Column, OneToOne, Relation, RelationId } from "typeorm";
import {
  PlayableEntityFactionType,
  PlayableEntityFactionValues,
} from "../../../enums/playable-entity-faction.enum";
import { TileEntityType } from "../../../enums/tile-entity-type.enum";
import { PlayableEntity } from "../../playable-entity/playable-entity.entity";
import { TileEntity } from "../tile-entity.entity";

@ChildEntity()
export class TilePlayableEntity extends TileEntity {
  @Column({ default: TileEntityType.PLAYABLE_ENTITY, update: false })
  readonly type = TileEntityType.PLAYABLE_ENTITY;

  @OneToOne(() => PlayableEntity)
  readonly playableEntity: Relation<PlayableEntity>;

  @RelationId(
    (tilePlayableEntity: TilePlayableEntity) =>
      tilePlayableEntity.playableEntity,
  )
  readonly playableEntityId: Relation<PlayableEntity["id"]>;

  @Column({
    type: "enum",
    enum: PlayableEntityFactionValues,
    enumName: "PlayableEntityFaction",
    update: false,
  })
  readonly faction: PlayableEntityFactionType;

  @Column()
  isBlocking: boolean;
}
