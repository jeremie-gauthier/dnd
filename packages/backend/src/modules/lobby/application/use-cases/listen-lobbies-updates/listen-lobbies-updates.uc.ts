import { Injectable } from "@nestjs/common";
import type { ServerSocket } from "src/interfaces/socket.interface";
import type { UseCase } from "src/interfaces/use-case.interface";
import { LOBBIES_ROOM } from "src/modules/lobby/shared/constants";

@Injectable()
export class ListenLobbiesUpdatesUseCase implements UseCase {
  public async execute({ client }: { client: ServerSocket }): Promise<void> {
    await client.join(LOBBIES_ROOM);
  }
}
