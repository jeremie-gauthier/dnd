import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { HeroClassType, HeroClassValues } from '../enums/hero-class.enum';
import { Campaign } from './campaign.entity';
import { PlayableEntity } from './playable-entity';

@Entity()
@Index(['name', 'class', 'level'], { unique: true })
export class HeroTemplate extends PlayableEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.availableHeroes, { onDelete: 'CASCADE' })
  readonly campaign: Relation<Campaign>;

  @Column()
  readonly name: string;

  @Column({ type: 'enum', enum: HeroClassValues })
  readonly class: HeroClassType;

  @Column()
  readonly level: number;
}
