import { LobbyDomainError } from "../lobby-domain.error";

type ErrorName = "USER_NOT_HOST";

export class HostError extends LobbyDomainError<ErrorName> {}
