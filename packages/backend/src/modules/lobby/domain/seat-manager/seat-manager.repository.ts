import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { LobbiesRepository } from "../../infra/database/lobbies.repository";
import { UsersRepository } from "../../infra/database/users.repository";

@Injectable()
export class SeatManagerRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async delLobbyById(lobbyId: LobbyEntity["id"]): Promise<void> {
    await this.lobbiesRepository.del(lobbyId);
  }

  public async saveUserLobby({
    userId,
    lobby,
  }: { userId: User["id"]; lobby: LobbyEntity }) {
    await this.usersRepository.set({ userId, lobbyId: lobby.id });
  }

  public async removeUserLobby({ userId }: { userId: User["id"] }) {
    await this.usersRepository.del(userId);
  }

  public async getUserLobby({
    userId,
  }: { userId: User["id"] }): Promise<LobbyEntity["id"] | undefined> {
    return await this.usersRepository.get(userId);
  }
}
