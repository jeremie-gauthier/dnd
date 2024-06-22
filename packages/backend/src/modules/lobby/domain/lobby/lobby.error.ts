import { LobbyDomainError } from "../lobby-domain.error";

type ErrorName =
  | "PLAYERS_LIMIT_REACHED"
  | "PLAYER_NOT_FOUND"
  | "ALREADY_IN_LOBBY";

export class LobbyError extends LobbyDomainError<ErrorName> {}
