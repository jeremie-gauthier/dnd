import { LobbyEntity } from "@dnd/shared";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { LobbyEvent } from "src/modules/lobby/events/lobby-event.enum";
import { UserJoinedLobbyPayload } from "src/modules/lobby/events/user-joined-lobby.payload";
import { UserLeftLobbyPayload } from "src/modules/lobby/events/user-left-lobby.payload";
import { LobbyDeletedPayload } from "../../events/lobby-deleted.payload";
import { BackupService } from "../backup/backup.service";
import { SeatManagerRepository } from "./seat-manager.repository";

@Injectable()
export class SeatManagerService {
  constructor(
    private readonly repository: SeatManagerRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly backupService: BackupService,
  ) {}

  public async take({
    lobby,
    userId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
  }): Promise<void> {
    this.mustExecute({ userId, lobby });

    lobby.players.push({
      userId,
      heroesSelected: [],
      isReady: false,
    });

    await this.repository.saveUserLobby({ userId, lobby });

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({ userId, lobby }),
    );
  }

  private mustExecute({
    userId,
    lobby,
  }: { userId: User["id"]; lobby: LobbyEntity }) {
    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    if (lobby.players.length >= lobby.config.nbPlayersMax) {
      throw new ForbiddenException("No space left in this lobby");
    }

    if (lobby.players.some((player) => player.userId === userId)) {
      throw new ForbiddenException("You are already in this lobby");
    }
  }

  public async leave({
    lobby,
    userId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
  }): Promise<void> {
    lobby.players = lobby.players.filter((player) => player.userId !== userId);
    for (const heroAvailable of lobby.heroesAvailable) {
      if (heroAvailable.pickedBy === userId) {
        heroAvailable.pickedBy = undefined;
      }
    }
    if (lobby.gameMaster.userId === userId) {
      lobby.gameMaster.userId = undefined;
    }

    await this.repository.removeUserLobby({ userId });

    this.eventEmitter.emitAsync(
      LobbyEvent.UserLeftLobby,
      new UserLeftLobbyPayload({ userId, lobby }),
    );

    const hasNoPlayersLeft = lobby.players.length === 0;
    const hasHostLeft = lobby.host.userId === userId;
    const shouldDeleteLobby = hasNoPlayersLeft || hasHostLeft;
    if (shouldDeleteLobby) {
      await this.deleteLobby({ lobby });
    } else {
      await this.backupService.updateLobby({ lobby });
    }
  }

  private async deleteLobby({ lobby }: { lobby: LobbyEntity }) {
    for (const { userId } of lobby.players) {
      this.eventEmitter.emitAsync(
        LobbyEvent.UserLeftLobby,
        new UserLeftLobbyPayload({ userId, lobby }),
      );
    }

    await this.repository.delLobbyById(lobby.id);

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyDeleted,
      new LobbyDeletedPayload({ lobby }),
    );
  }

  public mustBeInTheLobby({
    lobby,
    userId,
  }: { lobby: LobbyEntity; userId: User["id"] }) {
    if (!lobby.players.some((player) => player.userId === userId)) {
      throw new ForbiddenException("User does not belong to this lobby");
    }
  }

  public getPlayerOrThrow({
    lobby,
    userId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
  }): LobbyEntity["players"][number] {
    const player = lobby.players.find((player) => player.userId === userId);
    if (!player) {
      throw new ForbiddenException("User not found in this lobby");
    }
    return player;
  }

  public async getUserLobby({
    userId,
  }: { userId: User["id"] }): Promise<LobbyEntity | undefined> {
    const lobbyId = await this.repository.getUserLobby({ userId });
    if (lobbyId) {
      return this.backupService.getLobbyOrThrow({ lobbyId });
    }
  }
}
