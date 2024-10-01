import { GameDomainError } from "../../game-domain.error";

type ErrorName = "ATTACK_NOT_FOUND";

export class WeaponError extends GameDomainError<ErrorName> {}
