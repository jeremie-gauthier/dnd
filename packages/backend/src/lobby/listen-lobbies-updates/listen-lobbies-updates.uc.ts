import { Injectable } from "@nestjs/common";
import type { ServerSocket } from "src/interfaces/socket.type";
import type { UseCase } from "src/interfaces/use-case.interface";
import { LOBBIES_ROOM } from "src/lobby/constants";

@Injectable()
export class ListenLobbiesUpdatesUseCase implements UseCase {
  public async execute({ client }: { client: ServerSocket }): Promise<void> {
    await client.join(LOBBIES_ROOM);
  }
}
