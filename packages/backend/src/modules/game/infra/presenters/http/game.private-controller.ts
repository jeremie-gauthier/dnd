import { GameEntity, GetUserGameStateOutput } from "@dnd/shared";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { GetUserGameStateUseCase } from "src/modules/game/application/use-cases/get-user-game-state/get-user-game-state.uc";

@UseGuards(AuthGuard)
@Controller("game/private")
export class GamePrivateController {
  constructor(
    private readonly getUserGameStateUseCase: GetUserGameStateUseCase,
  ) {}

  @Get("get-user-game-state/:gameId")
  public async getLobbies(
    @AuthUser() user: Request["user"],
    @Param("gameId") gameId: GameEntity["id"],
  ): Promise<GetUserGameStateOutput> {
    return await this.getUserGameStateUseCase.execute({
      userId: user.id,
      gameId,
    });
  }
}
