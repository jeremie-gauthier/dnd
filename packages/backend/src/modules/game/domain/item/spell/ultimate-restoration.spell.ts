import { Attack } from "../../attack/attack.entity";
import { Spell } from "./spell.entity";

export class UltimateRestoration extends Spell {
  public override use(): ReturnType<Attack["roll"]> {
    throw new Error("Method not implemented.");
  }
}
