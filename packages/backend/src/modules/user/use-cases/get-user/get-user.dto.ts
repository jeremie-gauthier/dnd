import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/database/entities/user.entity";
import { UserResponseDto } from "src/dtos/response/user.dto";

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
