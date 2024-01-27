import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { HeroClassType, HeroClassValues } from '../enums/hero-class.enum';
import { PlayableEntity } from './playable-entity';

@Entity()
@Index(['name', 'class', 'level'], { unique: true })
export class HeroTemplate extends PlayableEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly name: string;

  @Column({ type: 'enum', enum: HeroClassValues })
  readonly class: HeroClassType;

  @Column()
  readonly level: number;
}
