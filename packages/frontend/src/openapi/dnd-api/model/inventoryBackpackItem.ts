import type { ArtifactResponseDto } from "./artifactResponseDto";
import type { PotionResponseDto } from "./potionResponseDto";
import type { SpellResponseDto } from "./spellResponseDto";
/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * DnD
 * The DnD API description
 * OpenAPI spec version: 1.0
 */
import type { WeaponResponseDto } from "./weaponResponseDto";

export type InventoryBackpackItem =
  | WeaponResponseDto
  | SpellResponseDto
  | ArtifactResponseDto
  | PotionResponseDto;
