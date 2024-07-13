import { GameDomainError } from "../game-domain.error";

type ErrorName = "MONSTER_TEMPLATE_NOT_FOUND";

export class MonsterTemplatesError extends GameDomainError<ErrorName> {}
