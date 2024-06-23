import { GameDomainError } from "../game-domain.error";

type ErrorName = "NEGATIVE_COORD" | "BAD_COORD_INDEX";

export class CoordError extends GameDomainError<ErrorName> {}
