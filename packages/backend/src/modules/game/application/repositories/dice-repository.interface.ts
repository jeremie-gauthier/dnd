import { Dice } from "../../domain/dice/dice.vo";

export interface DiceRepository {
  getOneOrThrow(data: { name: Dice["name"] }): Promise<Dice>;
  getAll(): Promise<Array<Dice>>;
}

export const DICE_REPOSITORY = Symbol("DiceRepository");
