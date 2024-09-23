import { Attack } from "../../attack/attack.entity";
import { Spell } from "./spell.entity";

export class InvisibleServant extends Spell {
  public use(): ReturnType<Attack["roll"]> {
    throw new Error("Method not implemented.");
  }
}
