import { PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { HeroEntity } from "src/modules/game/infra/database/entities/game-entity/playable-entity/hero.entity";
import { HeroEntityResponseDto } from "../../dtos/response/hero-entity.dto";

export class GetHeroDetailsInputDto {
  @IsUUID()
  readonly heroId: HeroEntity["id"];
}

export class GetHeroDetailsOutputDto extends PickType(HeroEntityResponseDto, [
  "id",
  "class",
  "name",
  "characteristic",
  "imgUrl",
] as const) {}
