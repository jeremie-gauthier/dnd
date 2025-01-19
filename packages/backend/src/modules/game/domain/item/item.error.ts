import { GameDomainError } from "../game-domain.error";

type ErrorName = "BAD_ITEM_TYPE" | "ATTACK_NOT_FOUND";

export class ItemError extends GameDomainError<ErrorName> {}
