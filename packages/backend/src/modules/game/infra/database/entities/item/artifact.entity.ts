import { Item } from "./item.entity";

export class Artifact extends Item {
  type: "Artifact";
  hasSavingThrow: boolean;
}
