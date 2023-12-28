import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
} from 'typeorm';
import { CampaignProgression } from './campaign-progression.entity';
import { CampaignStage } from './campaign-stage.entity';

export enum CampaignStageProgressionStatus {
  AVAILABLE = 'AVAILABLE',
  LOCKED = 'LOCKED',
  STARTED = 'STARTED',
}

@Entity()
@Index(['campaignProgression', 'stage'], { unique: true })
export class CampaignStageProgression {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(
    () => CampaignProgression,
    (campaignProgression) => campaignProgression.stageProgressions,
    { onDelete: 'CASCADE' },
  )
  readonly campaignProgression: Relation<CampaignProgression>;

  @ManyToOne(() => CampaignStage, (campaignStage) => campaignStage.progressions, {
    onDelete: 'CASCADE',
  })
  readonly stage: Relation<CampaignStage>;

  @RelationId(
    (campaignStageProgression: CampaignStageProgression) => campaignStageProgression.stage,
  )
  readonly stageId: Relation<CampaignStage['id']>;

  @Column({ type: 'enum', enum: CampaignStageProgressionStatus })
  status: CampaignStageProgressionStatus;
}
