import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  UserStatus,
  UserStatusType,
} from "../../infra/database/enums/user-status.enum";

export class UserResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({ enum: UserStatus, enumName: "UserStatus" })
  readonly status: UserStatusType;

  @Expose()
  readonly avatarUrl: string;

  @Expose()
  readonly username: string;
}
