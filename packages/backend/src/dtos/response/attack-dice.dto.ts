import { Expose } from "class-transformer";

export class AttackDiceResponseDto {
  @Expose()
  readonly id: string;
}
