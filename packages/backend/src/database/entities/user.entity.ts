import { Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { CampaignProgression } from './campaign-progression.entity';

@Entity()
export class User {
  @PrimaryColumn()
  readonly id: string;

  @OneToMany(() => CampaignProgression, (campaignProgression) => campaignProgression.user, {
    onDelete: 'CASCADE',
  })
  campaignProgressions: Relation<CampaignProgression[]>;
}
