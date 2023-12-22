import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { CampaignStage } from './campaign-stage.entity';

export enum CampaignStatus {
  AVAILABLE = 'AVAILABLE',
  COMING_SOON = 'COMING_SOON',
  DISABLED = 'DISABLED',
}

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @OneToMany(() => CampaignStage, (stage) => stage.campaign, { onDelete: 'CASCADE' })
  readonly stages: Relation<CampaignStage[]>;

  @Column({ unique: true })
  readonly title: string;

  @Column({ type: 'enum', enum: CampaignStatus })
  readonly status: CampaignStatus;
}
