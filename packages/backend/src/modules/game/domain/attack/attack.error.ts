import { GameDomainError } from "../game-domain.error";

type ErrorName = "TARGET_OUT_OF_RANGE";

export class AttackError extends GameDomainError<ErrorName> {}
