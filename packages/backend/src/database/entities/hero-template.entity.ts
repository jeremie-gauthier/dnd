import { InventoryJson } from "@dnd/shared";
import { Column, Entity, Index, ManyToMany, type Relation } from "typeorm";
import { Campaign } from "./campaign.entity";
import { PlayableEntity } from "./playable-entity";

@Entity()
@Index(["name", "class", "level"], { unique: true })
export class HeroTemplate extends PlayableEntity {
  @ManyToMany(
    () => Campaign,
    (campaign) => campaign.playableHeroes,
    { onDelete: "CASCADE" },
  )
  readonly playableInCampaigns: Relation<Campaign[]>;

  @Column({ type: "json", nullable: false })
  readonly inventory: InventoryJson;
}
