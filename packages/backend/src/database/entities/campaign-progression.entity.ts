import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
} from 'typeorm';
import {
  CampaignProgressionStatusType,
  CampaignProgressionStatusValues,
} from '../enums/campaign-progression-status.enum';
import { CampaignStageProgression } from './campaign-stage-progression.entity';
import { Campaign } from './campaign.entity';
import { User } from './user.entity';

@Entity()
@Index(['campaign', 'user'], { unique: true })
export class CampaignProgression {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.stages, { onDelete: 'CASCADE' })
  readonly campaign: Relation<Campaign>;

  @RelationId((campaignProgression: CampaignProgression) => campaignProgression.campaign)
  readonly campaignId: Relation<Campaign['id']>;

  @ManyToOne(() => User, (user) => user.campaignProgressions, { onDelete: 'CASCADE' })
  readonly user: Relation<User>;

  @OneToMany(
    () => CampaignStageProgression,
    (campaignStageProgression) => campaignStageProgression.campaignProgression,
    { cascade: true },
  )
  readonly stageProgressions: Relation<CampaignStageProgression[]>;

  @Column({ type: 'enum', enum: CampaignProgressionStatusValues })
  status: CampaignProgressionStatusType;
}
