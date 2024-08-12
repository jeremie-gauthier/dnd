import { GameDomainError } from "../game-domain.error";

type ErrorName = "OUT_OF_RANGE_COORD" | "TILE_NOT_ACCESSIBLE";

export class BoardError extends GameDomainError<ErrorName> {}
