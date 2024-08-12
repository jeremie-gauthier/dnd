import { GameDomainError } from "../../game-domain.error";

type ErrorName = "TILE_ENTITY_NOT_FOUND";

export class TileError extends GameDomainError<ErrorName> {}
