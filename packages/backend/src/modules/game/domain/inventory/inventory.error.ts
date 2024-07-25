import { GameDomainError } from "../game-domain.error";

type ErrorName = "ITEM_NOT_FOUND_IN_GEAR_STUFF";

export class InventoryError extends GameDomainError<ErrorName> {}
