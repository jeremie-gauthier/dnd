import { GameDomainError } from "../game-domain.error";

type ErrorName =
  | "ITEM_NOT_FOUND_IN_GEAR_STUFF"
  | "NO_SPACE_LEFT_IN_INVENTORY"
  | "ITEM_NOT_FOUND_IN_BACKPACK_STUFF"
  | "ITEM_NOT_FOUND_IN_INVENTORY";

export class InventoryError extends GameDomainError<ErrorName> {}
