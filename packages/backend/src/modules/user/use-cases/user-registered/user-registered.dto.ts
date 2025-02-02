import { PickType } from "@nestjs/swagger";
import { User } from "src/database/entities/user.entity";

export class UserRegisteredInputDto extends PickType(User, [
  "id",
  "avatarUrl",
  "username",
]) {}
