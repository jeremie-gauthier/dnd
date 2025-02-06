import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Translation {
  @PrimaryColumn({ update: false })
  readonly locale: string;

  @PrimaryColumn({ update: false })
  readonly namespace: string;

  @Column({ type: "json", default: {} })
  translations: Record<string, string>;
}
