import { Column, Entity, ManyToOne, type Relation } from "typeorm";
import { CampaignProgression } from "./campaign-progression.entity";
import { Inventory } from "./inventory.entity";
import { PlayableEntity } from "./playable-entity.entity";

@Entity()
export class Hero extends PlayableEntity {
  @ManyToOne(
    () => CampaignProgression,
    (campaignProgression) => campaignProgression.heroes,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly campaignProgression: Relation<CampaignProgression>;

  @Column(() => Inventory)
  readonly inventory: Inventory;
}
