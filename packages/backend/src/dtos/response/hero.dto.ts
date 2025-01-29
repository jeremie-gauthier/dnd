import { Expose } from "class-transformer";

export class HeroResponseDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly imgUrl: string;
}
