import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
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

  @Column({ type: 'enum', enum: CampaignStageProgressionStatus })
  status: CampaignStageProgressionStatus;
}
