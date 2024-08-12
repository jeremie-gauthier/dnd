import { GameDomainError } from "../game-domain.error";

type ErrorName = "BAD_ROLL_DICE";

export class DiceError extends GameDomainError<ErrorName> {}
