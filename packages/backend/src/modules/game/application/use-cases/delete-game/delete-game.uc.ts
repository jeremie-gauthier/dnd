import { Injectable } from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import { LobbyDeletedPayload } from "src/modules/shared/events/lobby/lobby-deleted.payload";
import { DeleteGameRepository } from "./delete-game.repository";

@Injectable()
export class DeleteGameUseCase implements UseCase {
  constructor(private readonly repository: DeleteGameRepository) {}

  public async execute({ lobby }: LobbyDeletedPayload): Promise<void> {
    await this.repository.deleteGame({ gameId: lobby.id });
  }
}
