import { Column, Entity, PrimaryColumn } from "typeorm";
import { UserStatusType, UserStatusValues } from "../enums/user-status.enum";

@Entity()
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column({ type: "enum", enum: UserStatusValues })
  status: UserStatusType;

  @Column()
  avatarUrl: string;

  @Column()
  username: string;
}
