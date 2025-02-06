import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { TranslationResponseDto } from "../../dtos/response/translation.dto";

export class GetTranslationInputParamsDto {
  @IsString()
  @IsNotEmpty()
  readonly locale: string;

  @IsString()
  @IsNotEmpty()
  readonly namespace: string;
}

export class GetTranslationOutputDto extends PickType(TranslationResponseDto, [
  "locale",
  "namespace",
  "translations",
]) {}
