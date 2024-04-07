import { Injectable } from "@nestjs/common";
import { LOBBIES_ROOM } from "src/lobby/constants";
import type { ServerSocket } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";

@Injectable()
export class ListenLobbiesChangesUseCase implements UseCase {
  public async execute(client: ServerSocket): Promise<void> {
    await client.join(LOBBIES_ROOM);
  }
}
