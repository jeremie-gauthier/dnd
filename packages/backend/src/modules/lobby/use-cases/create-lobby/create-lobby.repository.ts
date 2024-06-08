import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UsersRepository } from "src/redis/repositories/users.repository";
import { LobbiesRepository } from "../../infra/database/lobbies.repository";

@Injectable()
export class CreateLobbyRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async createLobby(
    lobby: Omit<LobbyEntity, "id">,
  ): Promise<LobbyEntity> {
    return await this.lobbiesRepository.set(lobby);
  }

  public async getUserLobby({
    userId,
  }: { userId: User["id"] }): Promise<string | undefined> {
    return await this.usersRepository.get(userId);
  }

  public async getLobbyById({
    lobbyId,
  }: { lobbyId: LobbyEntity["id"] }): Promise<LobbyEntity | null> {
    return await this.lobbiesRepository.getOne(lobbyId);
  }
}
