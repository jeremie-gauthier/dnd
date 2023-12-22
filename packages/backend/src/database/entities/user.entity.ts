import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { CampaignProgression } from './campaign-progression.entity';

export enum UserStatus {
  CREATED = 'CREATED',
  INITIALIZED = 'INITIALIZED',
}

@Entity()
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column({ type: 'enum', enum: UserStatus })
  status: UserStatus;

  @OneToMany(() => CampaignProgression, (campaignProgression) => campaignProgression.user, {
    cascade: true,
  })
  campaignProgressions: Relation<CampaignProgression[]>;
}
