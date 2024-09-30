import { GameDomainError } from "../../game-domain.error";

type ErrorName = "COULD_NOT_FOUND_ACCESSIBLE_TILE";

export class ChestTrapError extends GameDomainError<ErrorName> {}
