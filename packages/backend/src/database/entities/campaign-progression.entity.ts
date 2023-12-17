import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { CampaignStageProgression } from './campaign-stage-progression.entity';
import { Campaign } from './campaign.entity';
import { User } from './user.entity';

export enum CampaignProgressionStatus {
  AVAILABLE = 'AVAILABLE',
  COMING_SOON = 'COMING_SOON',
  LOCKED = 'LOCKED',
}

@Entity()
@Index(['campaign', 'user'], { unique: true })
export class CampaignProgression {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.stages, { cascade: true })
  readonly campaign: Relation<Campaign>;

  @ManyToOne(() => User, (user) => user.campaignProgressions, { cascade: true })
  readonly user: Relation<User>;

  @OneToMany(
    () => CampaignStageProgression,
    (campaignStageProgression) => campaignStageProgression.campaignProgression,
    { onDelete: 'CASCADE' },
  )
  readonly stageProgressions: Relation<CampaignStageProgression[]>;

  @Column({ type: 'enum', enum: CampaignProgressionStatus })
  status: CampaignProgressionStatus;
}
