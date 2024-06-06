import {
  LobbyEntityStatus,
  StartGameInput,
  type LobbyEntity,
} from "@dnd/shared";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EnvSchema } from "src/config/env.config";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { HostRequestedGameStartPayload } from "src/lobby/events/emitters/host-requested-game-start.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-event.enum";
import { BackupService } from "../services/backup/backup.service";

@Injectable()
export class StartGameUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService<EnvSchema>,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: StartGameInput & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.backupService.getLobbyOrThrow({ lobbyId });
    this.mustExecute({ lobby, userId });

    this.setLobbyAsReadyForGameInitializing(lobby);
    await this.backupService.updateLobby({ lobby });

    this.eventEmitter.emitAsync(
      LobbyEvent.HostRequestedGameStart,
      new HostRequestedGameStartPayload({ userId, lobby }),
    );
  }

  private mustExecute({
    lobby,
    userId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
  }) {
    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    if (lobby.host.userId !== userId) {
      throw new ForbiddenException("You are not the host of this lobby");
    }

    if (lobby.players.some((player) => !player.isReady)) {
      throw new ForbiddenException("Some players are not ready");
    }

    if (
      lobby.heroesAvailable.some((heroAvailable) => !heroAvailable.pickedBy)
    ) {
      throw new ForbiddenException("Some hero are not picked");
    }

    if (lobby.gameMaster.userId === undefined) {
      throw new ForbiddenException("No Game Master found for this lobby");
    }

    const gameMasterPlayer = lobby.players.find(
      ({ userId }) => userId === lobby.gameMaster.userId,
    )!;
    const isEnabled =
      this.configService.getOrThrow("NODE_ENV") !== "development";
    if (isEnabled && gameMasterPlayer.heroesSelected.length > 0) {
      throw new ForbiddenException("Game Master cannot control heroes");
    }
  }

  private setLobbyAsReadyForGameInitializing(lobby: LobbyEntity) {
    lobby.status = LobbyEntityStatus.GAME_INITIALIZING;
  }
}
