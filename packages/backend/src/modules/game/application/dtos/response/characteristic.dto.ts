import { Expose } from "class-transformer";

export class CharacteristicResponseDto {
  @Expose()
  readonly baseHealthPoints: number;

  @Expose()
  readonly healthPoints: number;

  @Expose()
  readonly baseManaPoints: number;

  @Expose()
  readonly manaPoints: number;

  @Expose()
  readonly baseArmorClass: number;

  @Expose()
  readonly armorClass: number;

  @Expose()
  readonly baseMovementPoints: number;

  @Expose()
  readonly movementPoints: number;

  @Expose()
  readonly baseActionPoints: number;

  @Expose()
  readonly actionPoints: number;
}
