import { IntersectionType, PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { HeroUI } from "src/database/entities/hero-ui.entity";
import { Hero } from "src/database/entities/hero.entity";

export class GetHeroDetailsInputDto {
  @IsUUID()
  readonly heroId: Hero["id"];
}

export class GetHeroDetailsOutputDto extends IntersectionType(
  PickType(Hero, ["id", "class", "name", "characteristic"] as const),
  PickType(HeroUI, ["imgUrl"] as const),
) {}
