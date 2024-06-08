import { GetLobbyOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "src/modules/lobby/domain/backup/backup.service";

@Injectable()
export class GetLobbyUseCase implements UseCase {
  constructor(private readonly backupService: BackupService) {}

  public async execute({
    lobbyId,
  }: { lobbyId: string }): Promise<GetLobbyOutput> {
    const lobby = await this.backupService.getLobbyOrThrow({ lobbyId });
    return lobby;
  }
}
