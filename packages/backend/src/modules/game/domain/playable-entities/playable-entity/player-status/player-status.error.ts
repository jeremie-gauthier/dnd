import { GameDomainError } from "../../../game-domain.error";

type ErrorName = "ILLEGAL_STATUS_EDIT";

export class PlayerStatusError extends GameDomainError<ErrorName> {}
