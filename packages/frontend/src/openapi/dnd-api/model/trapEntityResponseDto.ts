import type { InteractiveEntityKindTrap } from "./interactiveEntityKindTrap";
/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * DnD
 * The DnD API description
 * OpenAPI spec version: 1.0
 */
import type { TileEntityTypeInteractiveEntity } from "./tileEntityTypeInteractiveEntity";
import type { TrapName } from "./trapName";

export interface TrapEntityResponseDto {
  type: TileEntityTypeInteractiveEntity;
  kind: InteractiveEntityKindTrap;
  name: TrapName;
  isVisible: boolean;
  isBlocking: boolean;
  canInteract: boolean;
}
