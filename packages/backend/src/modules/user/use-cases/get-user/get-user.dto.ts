import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UserResponseDto } from "../../dtos/response/user.dto";
import { User } from "../../infra/database/entities/user.entity";

export class GetUserInputParamsDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: User["id"];
}

export class GetUserOutputDto extends PickType(UserResponseDto, [
  "id",
  "avatarUrl",
  "username",
]) {}
