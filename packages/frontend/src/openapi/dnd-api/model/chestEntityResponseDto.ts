import type { InteractiveEntityKindChest } from "./interactiveEntityKindChest";
/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * DnD
 * The DnD API description
 * OpenAPI spec version: 1.0
 */
import type { TileEntityTypeInteractiveEntity } from "./tileEntityTypeInteractiveEntity";

export interface ChestEntityResponseDto {
  type: TileEntityTypeInteractiveEntity;
  kind: InteractiveEntityKindChest;
  isVisible: boolean;
  isBlocking: boolean;
  canInteract: boolean;
}
