import { GameDomainError } from "../game-domain.error";

type ErrorName = "ILLEGAL_STATUS_EDIT";

export class GameStatusError extends GameDomainError<ErrorName> {}
