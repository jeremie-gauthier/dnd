import { LobbyDomainError } from "../lobby-domain.error";

type ErrorName = "ILLEGAL_STATUS_EDIT" | "BAD_LOBBY_STATUS";

export class LobbyStatusError extends LobbyDomainError<ErrorName> {}
