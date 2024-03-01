import { Injectable } from "@nestjs/common";
import { LOBBIES_ROOM } from "src/lobby/constants";
import { ServerSocket } from "src/types/socket.type";
import { UseCase } from "src/types/use-case.interface";

@Injectable()
export class ListenLobbiesChangesUseCase implements UseCase {
  public async execute(client: ServerSocket): Promise<void> {
    await client.join(LOBBIES_ROOM);
  }
}
