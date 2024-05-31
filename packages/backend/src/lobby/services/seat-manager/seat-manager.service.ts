import { LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { DeleteLobbyPayload } from "src/lobby/events/emitters/delete-lobby.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import { UserJoinedLobbyPayload } from "src/lobby/events/emitters/user-joined-lobby.payload";
import { UserLeftLobbyPayload } from "src/lobby/events/emitters/user-left-lobby.payload";
import { BackupService } from "../backup/backup.service";
import { SeatManagerRepository } from "./seat-manager.repository";

@Injectable()
export class SeatManagerService {
  constructor(
    private readonly repository: SeatManagerRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly backupService: BackupService,
  ) {}

  public take({
    lobby,
    userId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
  }): void {
    this.assertCanEnterLobby(userId, lobby);

    lobby.players.push({
      userId,
      heroesSelected: [],
      isReady: false,
    });

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({ userId, lobby }),
    );
  }

  private assertCanEnterLobby(
    userId: User["id"],
    lobby: LobbyEntity | null,
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

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

    this.eventEmitter.emitAsync(
      LobbyEvent.UserLeftLobby,
      new UserLeftLobbyPayload({ userId, lobby }),
    );

    const hasNoPlayersLeft = lobby.players.length === 0;
    if (hasNoPlayersLeft) {
      await this.deleteLobby({ lobby });
    } else {
      const shouldSwapHost = lobby.host.userId === userId;
      if (shouldSwapHost) {
        lobby.host.userId = lobby.players[0]!.userId;
      }

      await this.backupService.updateLobby({ lobby });
    }
  }

  private async deleteLobby({ lobby }: { lobby: LobbyEntity }) {
    await this.repository.delLobbyById(lobby.id);

    this.eventEmitter.emitAsync(
      LobbyEvent.DeleteLobby,
      new DeleteLobbyPayload({ lobby }),
    );

    if (
      lobby.status === "GAME_INITIALIZING" ||
      lobby.status === "GAME_STARTED"
    ) {
      await this.repository.delGameById({ gameId: lobby.id });
    }
  }
}
