import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HeroClassType, HeroClassValues } from '../enums/hero-class.enum';
import { PlayableEntity } from './playable-entity';

@Entity()
export class Hero extends PlayableEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly name: string;

  @Column({ type: 'enum', enum: HeroClassValues })
  readonly class: HeroClassType;

  @Column()
  readonly level: number;
}
