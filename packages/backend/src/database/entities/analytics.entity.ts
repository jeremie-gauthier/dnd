import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ update: false })
  readonly eventName: string;

  @Column({ type: 'json', update: false })
  readonly data: Record<string, any>;

  @CreateDateColumn({ update: false })
  readonly createdAt: Date;
}
