import { GameDomainError } from "../game-domain.error";

type ErrorName = "UNEXPECTED_LOOT_ITEM";

export class GameError extends GameDomainError<ErrorName> {}
