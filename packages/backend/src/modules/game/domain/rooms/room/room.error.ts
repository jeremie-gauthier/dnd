import { GameDomainError } from "../../game-domain.error";

type ErrorName = "ROOM_NOT_FOUND";

export class RoomError extends GameDomainError<ErrorName> {}
