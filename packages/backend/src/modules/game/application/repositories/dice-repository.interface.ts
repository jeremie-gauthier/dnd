import { Dice as DiceDomain } from "../../domain/dice/dice.vo";

export interface DiceRepository {
  getOneOrThrow(data: { name: string }): Promise<DiceDomain>;
  getAll(): Promise<Array<DiceDomain>>;
}

export const DICE_REPOSITORY = Symbol("DiceRepository");
