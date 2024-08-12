import { GameDomainError } from "../../game-domain.error";

type ErrorName = "CANNOT_CAST_SPELL";

export class SpellError extends GameDomainError<ErrorName> {}
