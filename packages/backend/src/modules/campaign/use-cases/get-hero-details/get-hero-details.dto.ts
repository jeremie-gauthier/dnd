import { PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { Hero } from "src/database/entities/hero.entity";
import { HeroResponseDto } from "src/dtos/response/hero.dto";

export class GetHeroDetailsInputDto {
  @IsUUID()
  readonly heroId: Hero["id"];
}

export class GetHeroDetailsOutputDto extends PickType(HeroResponseDto, [
  "id",
  "class",
  "name",
  "characteristic",
  "imgUrl",
] as const) {}
