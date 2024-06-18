import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import type { GetLobbiesOutputDto } from "../../../application/use-cases/get-lobbies/get-lobbies.dto";
import { GetLobbiesUseCase } from "../../../application/use-cases/get-lobbies/get-lobbies.uc";
import type { GetLobbyOutputDto } from "../../../application/use-cases/get-lobby/get-lobby.dto";
import { GetLobbyUseCase } from "../../../application/use-cases/get-lobby/get-lobby.uc";

@UseGuards(AuthGuard)
@Controller("lobby/private")
export class LobbyPrivateController {
  constructor(
    private readonly getLobbiesUseCase: GetLobbiesUseCase,
    private readonly getLobbyUseCase: GetLobbyUseCase,
  ) {}

  @Get("get-lobbies")
  public async getLobbies(): Promise<GetLobbiesOutputDto> {
    return await this.getLobbiesUseCase.execute();
  }

  @Get("get-lobby/:lobbyId")
  public async getLobby(
    @Param("lobbyId") lobbyId: string,
  ): Promise<GetLobbyOutputDto> {
    return await this.getLobbyUseCase.execute({ lobbyId });
  }
}
