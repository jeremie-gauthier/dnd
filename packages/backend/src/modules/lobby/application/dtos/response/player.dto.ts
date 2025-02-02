import { Expose } from "class-transformer";

export class PlayerResponseDto {
  @Expose()
  readonly userId: string;

  @Expose()
  readonly isReady: boolean;
}
