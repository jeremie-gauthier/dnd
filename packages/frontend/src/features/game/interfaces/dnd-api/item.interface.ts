import {
  ArtifactResponseDto,
  ChestTrapResponseDto,
  PotionResponseDto,
  SpellResponseDto,
  WeaponResponseDto,
} from "@/openapi/dnd-api";

export type Item =
  | WeaponResponseDto
  | SpellResponseDto
  | ArtifactResponseDto
  | PotionResponseDto
  | ChestTrapResponseDto;

export type BackpackItem = Exclude<Item, ChestTrapResponseDto>;
export type GearItem = Exclude<Item, PotionResponseDto | ChestTrapResponseDto>;
