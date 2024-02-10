import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { HeroClassType, HeroClassValues } from '../enums/hero-class.enum';
import { Campaign } from './campaign.entity';
import { PlayableEntity } from './playable-entity';

@Entity()
@Index(['name', 'class', 'level'], { unique: true })
export class HeroTemplate extends PlayableEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToMany(() => Campaign, (campaign) => campaign.playableHeroes, { onDelete: 'CASCADE' })
  readonly playableInCampaigns: Relation<Campaign[]>;

  @Column()
  readonly name: string;

  @Column({ type: 'enum', enum: HeroClassValues })
  readonly class: HeroClassType;

  @Column()
  readonly level: number;
}
