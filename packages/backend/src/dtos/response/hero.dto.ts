import { Expose } from "class-transformer";
import { PlayableEntityResponseDto } from "./playable-entity.dto";

export class HeroResponseDto extends PlayableEntityResponseDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly imgUrl: string;
}
