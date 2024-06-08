import { ListenLobbyChangesInput, LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { ServerSocket } from "src/interfaces/socket.interface";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "src/modules/lobby/domain/backup/backup.service";
import { SeatManagerService } from "src/modules/lobby/domain/seat-manager/seat-manager.service";
import { LobbyUpdatedPayload } from "../../events/lobby-changed.payload";
import { LobbyEvent } from "../../events/lobby-event.enum";

@Injectable()
export class ListenLobbyUpdatesUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly backupService: BackupService,
    private readonly seatManagerService: SeatManagerService,
  ) {}

  public async execute({
    client,
    lobbyId,
  }: ListenLobbyChangesInput & { client: ServerSocket }): Promise<void> {
    const lobby = await this.backupService.getLobbyOrThrow({ lobbyId });
    this.mustExecute({ lobby, userId: client.data.userId });

    await client.join(lobby.id);

    // ? no update, but it's an easy way to trigger a ws publish for the new user
    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyUpdated,
      new LobbyUpdatedPayload({ lobby }),
    );
  }

  private mustExecute({
    lobby,
    userId,
  }: { lobby: LobbyEntity; userId: LobbyEntity["players"][number]["userId"] }) {
    this.seatManagerService.mustBeInTheLobby({ lobby, userId });
  }
}
