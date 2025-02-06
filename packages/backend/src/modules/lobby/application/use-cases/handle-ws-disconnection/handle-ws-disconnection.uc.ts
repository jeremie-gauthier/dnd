import { Injectable } from "@nestjs/common";
import type { ServerSocket } from "src/interfaces/socket.interface";
import type { UseCase } from "src/interfaces/use-case.interface";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import { LeaveLobbyUseCase } from "../leave-lobby/leave-lobby.uc";

@Injectable()
export class HandleWsDisconnectionUseCase implements UseCase {
  constructor(private readonly leaveLobbyUseCase: LeaveLobbyUseCase) {}

  public async execute({ client }: { client: ServerSocket }): Promise<void> {
    const { userId } = client.data;

    await Promise.all([this.leaveLobby({ userId }), this.leaveRooms(client)]);
  }

  private async leaveRooms(client: ServerSocket) {
    return await Promise.all(
      Array.from(client.rooms).map((room) => client.leave(room)),
    );
  }

  private async leaveLobby({ userId }: { userId: User["id"] }) {
    try {
      await this.leaveLobbyUseCase.execute({ userId });
    } catch {}
  }
}
