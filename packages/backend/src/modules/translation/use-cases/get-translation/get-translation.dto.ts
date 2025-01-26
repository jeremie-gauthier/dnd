import { IsNotEmpty, IsString } from "class-validator";
import { Translation } from "src/database/entities/translation.entity";

export class GetTranslationInputParamsDto {
  @IsString()
  @IsNotEmpty()
  readonly locale: string;

  @IsString()
  @IsNotEmpty()
  readonly namespace: string;
}

export class GetTranslationOutputDto extends Translation {}
