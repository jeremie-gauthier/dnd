import { Expose } from "class-transformer";

export class GameMasterResponseDto {
  @Expose()
  readonly userId: string;
}
