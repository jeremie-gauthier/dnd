import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import type { GetLobbiesOutputDto } from "./get-lobbies/get-lobbies.dto";
import type { GetLobbiesUseCase } from "./get-lobbies/get-lobbies.uc";
import type { GetLobbyOutputDto } from "./get-lobby/get-lobby.dto";
import type { GetLobbyUseCase } from "./get-lobby/get-lobby.uc";

@UseGuards(JWTAuthGuard)
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
