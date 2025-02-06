import { Artifact as ArtifactPersistence } from "../entities/item/artifact.entity";
import { Spell as SpellPersistence } from "../entities/item/attack-item/spell/spell.entity";
import { Weapon as WeaponPersistence } from "../entities/item/attack-item/weapon.entity";
import { ChestTrap as ChestTrapPersistence } from "../entities/item/chest-trap.entity";
import { Potion as PotionPersistence } from "../entities/item/potion.entity";

export type ItemPersistence =
  | WeaponPersistence
  | SpellPersistence
  | ArtifactPersistence
  | PotionPersistence
  | ChestTrapPersistence;
