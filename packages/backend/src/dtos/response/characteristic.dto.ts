import { Expose } from "class-transformer";

export class CharacteristicResponseDto {
  @Expose()
  readonly baseHealthPoints: number;

  @Expose()
  readonly baseManaPoints: number;

  @Expose()
  readonly baseArmorClass: number;

  @Expose()
  readonly baseMovementPoints: number;

  @Expose()
  readonly baseActionPoints: number;
}
