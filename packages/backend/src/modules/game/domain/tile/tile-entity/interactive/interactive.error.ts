import { GameDomainError } from "../../../game-domain.error";

type ErrorName = "CANNOT_INTERACT";

export class TileInteractiveEntityError extends GameDomainError<ErrorName> {}
