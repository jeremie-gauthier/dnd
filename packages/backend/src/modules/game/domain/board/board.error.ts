import { GameDomainError } from "../game-domain.error";

type ErrorName = "OUT_OF_RANGE_COORD";

export class BoardError extends GameDomainError<ErrorName> {}
