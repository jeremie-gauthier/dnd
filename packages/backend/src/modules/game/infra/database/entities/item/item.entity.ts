export abstract class Item {
  abstract type: "Weapon" | "Spell" | "ChestTrap" | "Potion" | "Artifact";
  name: string;
  level: number;
}
