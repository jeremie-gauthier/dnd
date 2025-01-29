import type { InteractiveEntityKind } from "./interactiveEntityKind";
/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * DnD
 * The DnD API description
 * OpenAPI spec version: 1.0
 */
import type { TileEntityType } from "./tileEntityType";

export interface TileNonPlayableInteractiveEntityResponseDto {
  type: TileEntityType;
  kind: InteractiveEntityKind;
  isVisible: boolean;
  isBlocking: boolean;
  canInteract: boolean;
}
