import { Expose } from "class-transformer";

export class CharacteristicResponseDto {
  @Expose()
  readonly healthPoints: number;

  @Expose()
  readonly manaPoints: number;

  @Expose()
  readonly armorClass: number;

  @Expose()
  readonly movementPoints: number;

  @Expose()
  readonly actionPoints: number;
}
