import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import {
  type UserStatusType,
  UserStatusValues,
} from "../enums/user-status.enum";
import { CampaignProgression } from "./campaign-progression.entity";

@Entity()
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column({ type: "enum", enum: UserStatusValues })
  status: UserStatusType;

  @OneToMany(
    () => CampaignProgression,
    (campaignProgression) => campaignProgression.user,
    {
      cascade: true,
    },
  )
  campaignProgressions: Relation<CampaignProgression[]>;

  @Column()
  avatarUrl: string;

  @Column()
  username: string;
}
