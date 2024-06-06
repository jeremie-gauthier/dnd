import { GameEntity, GetUserGameStateOutput } from "@dnd/shared";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JWTAuthGuard } from "src/modules/authz/jwt-auth.guard";
import { JWTUser } from "src/modules/authz/jwt-user.decorator";
import { GetUserGameStateUseCase } from "./get-user-game-state/get-user-game-state.uc";

@UseGuards(JWTAuthGuard)
@Controller("game/private")
export class GamePrivateController {
  constructor(
    private readonly getUserGameStateUseCase: GetUserGameStateUseCase,
  ) {}

  @Get("get-user-game-state/:gameId")
  public async getLobbies(
    @JWTUser() user: Request["user"],
    @Param("gameId") gameId: GameEntity["id"],
  ): Promise<GetUserGameStateOutput> {
    return await this.getUserGameStateUseCase.execute({
      userId: user.id,
      gameId,
    });
  }
}
