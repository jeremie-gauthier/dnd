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
  LOCKED = 'LOCKED',
  STARTED = 'STARTED',
}

@Entity()
@Index(['campaign', 'user'], { unique: true })
export class CampaignProgression {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.stages, { onDelete: 'CASCADE' })
  readonly campaign: Relation<Campaign>;

  @ManyToOne(() => User, (user) => user.campaignProgressions, { onDelete: 'CASCADE' })
  readonly user: Relation<User>;

  @OneToMany(
    () => CampaignStageProgression,
    (campaignStageProgression) => campaignStageProgression.campaignProgression,
    { cascade: true },
  )
  readonly stageProgressions: Relation<CampaignStageProgression[]>;

  @Column({ type: 'enum', enum: CampaignProgressionStatus })
  status: CampaignProgressionStatus;
}