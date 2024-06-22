import { Lobby } from "../../domain/lobby/lobby.aggregate";
import { User } from "../../domain/user/user.entity";

export interface UsersRepository {
  upsert({
    userId,
    lobbyId,
  }: { userId: User["id"]; lobbyId: Lobby["id"] }): Promise<void>;
  getOne({ userId }: { userId: User["id"] }): Promise<Lobby["id"] | undefined>;
  del({ userId }: { userId: User["id"] }): Promise<void>;
}

export const USERS_REPOSITORY = Symbol("UsersRepository");
