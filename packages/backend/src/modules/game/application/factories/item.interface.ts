import { AttackRangeType } from "src/database/enums/attack-range.enum";
import { AttackTypeType } from "src/database/enums/attack-type.enum";
import { ItemTypeType } from "src/database/enums/item-type.enum";
import { PerkNameType } from "src/database/enums/perk-name.enum";
import { PerkTriggerType } from "src/database/enums/perk-trigger.enum";
import { ItemManaCostJson } from "../../infra/database/entities/item/attack-item/spell.entity";

type BaseItem = {
  type: ItemTypeType;
  name: string;
  level: number;
};

type Dice = {
  name: string;
  values: [number, number, number, number, number, number];
};

type Perk = {
  name: PerkNameType;
  trigger: PerkTriggerType;
};

export type AttackItem = BaseItem & {
  type: "Weapon" | "Spell";
  attacks: Array<{
    id: string;
    range: AttackRangeType;
    type: AttackTypeType;
    dices: Dice[];
    perks: Array<Perk>;
  }>;
};

export type WeaponItem = AttackItem & {
  type: "Weapon";
};
export type SpellItem = AttackItem & {
  type: "Spell";
  manaCost: ItemManaCostJson;
};
export type ChestTrapItem = BaseItem & {
  type: "ChestTrap";
};
export type PotionItem = BaseItem & {
  type: "Potion";
};
export type ArtifactItem = BaseItem & {
  type: "Artifact";
  hasSavingThrow: boolean;
};

export type GameItem =
  | WeaponItem
  | SpellItem
  | ChestTrapItem
  | PotionItem
  | ArtifactItem;
