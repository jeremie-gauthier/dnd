import { LobbyEntity, PickGameMasterInput } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "src/config/env.config";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { PickGameMasterRepository } from "./pick-game-master.repository";

@Injectable()
export class PickGameMasterUseCase implements UseCase {
  constructor(
    private readonly repository: PickGameMasterRepository,
    private readonly configService: ConfigService<EnvSchema>,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: PickGameMasterInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.repository.getLobbyById({ lobbyId });

    this.assertCanPickGameMaster(lobby, { userId });

    this.pickGameMaster({ lobby, userId });
    await this.backupService.updateLobby({ lobby });
  }

  private assertCanPickGameMaster(
    lobby: LobbyEntity | null,
    { userId }: { userId: User["id"] },
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    if (playerIdx < 0) {
      throw new ForbiddenException(
        "You must be in the lobby to pick Game Master",
      );
    }

    const player = lobby.players[playerIdx]!;
    if (player.isReady) {
      throw new ForbiddenException("You cannot pick role when you are ready");
    }

    if (lobby.gameMaster.userId !== undefined) {
      throw new ForbiddenException("Game Master role has already been picked");
    }

    const isEnabled =
      this.configService.getOrThrow("NODE_ENV") !== "development";
    if (isEnabled && player.heroesSelected.length > 0) {
      throw new ForbiddenException(
        "You cannot pick Game Master when you have a hero role",
      );
    }
  }

  private pickGameMaster({
    lobby,
    userId,
  }: { lobby: LobbyEntity; userId: User["id"] }): void {
    lobby.gameMaster.userId = userId;
  }
}
