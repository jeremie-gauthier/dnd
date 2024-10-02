import { GameDomainError } from "../game-domain.error";

type ErrorName = "BAD_ITEM_TYPE";

export class ItemError extends GameDomainError<ErrorName> {}
