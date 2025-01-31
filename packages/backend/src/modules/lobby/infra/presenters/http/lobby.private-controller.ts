import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { Serialize } from "src/middlewares/serialize.interceptor";
import { GetLobbiesOutputDto } from "../../../application/use-cases/get-lobbies/get-lobbies.dto";
import { GetLobbiesUseCase } from "../../../application/use-cases/get-lobbies/get-lobbies.uc";
import {
  GetLobbyInputParamsDto,
  GetLobbyOutputDto,
} from "../../../application/use-cases/get-lobby/get-lobby.dto";
import { GetLobbyUseCase } from "../../../application/use-cases/get-lobby/get-lobby.uc";

@UseGuards(AuthGuard)
@Controller("lobby/private")
@ApiTags("Lobby")
export class LobbyPrivateController {
  constructor(
    private readonly getLobbiesUseCase: GetLobbiesUseCase,
    private readonly getLobbyUseCase: GetLobbyUseCase,
  ) {}

  @Get("get-lobbies")
  @Serialize(GetLobbiesOutputDto)
  public async getLobbies(): Promise<GetLobbiesOutputDto> {
    return await this.getLobbiesUseCase.execute();
  }

  @Get("get-lobby/:lobbyId")
  @Serialize(GetLobbyOutputDto)
  public async getLobby(
    @Param() { lobbyId }: GetLobbyInputParamsDto,
  ): Promise<GetLobbyOutputDto> {
    return await this.getLobbyUseCase.execute({ lobbyId });
  }
}
