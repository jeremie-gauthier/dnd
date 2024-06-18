import { LobbyDomainError } from "../lobby-domain.error";

type ErrorName =
  | "PLAYABLE_CHARACTER_ALREADY_PICKED"
  | "PLAYABLE_CHARACTER_NOT_PICKED"
  | "BAD_USER_STATUS"
  | "BAD_USER_ROLE"
  | "BAD_OWNER";

export class PlayableCharacterError extends LobbyDomainError<ErrorName> {}
