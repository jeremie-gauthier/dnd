import { LobbyDomainError } from "../lobby-domain.error";

type ErrorName = "BAD_USER_STATUS";

export class UserStatusError extends LobbyDomainError<ErrorName> {}
