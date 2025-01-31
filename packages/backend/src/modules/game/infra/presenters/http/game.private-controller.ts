import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Request } from "express";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { Serialize } from "src/middlewares/serialize.interceptor";
import {
  GetUserGameStateInputParamsDto,
  GetUserGameStateOutputDto,
} from "src/modules/game/application/use-cases/get-user-game-state/get-user-game-state.dto";
import { GetUserGameStateUseCase } from "src/modules/game/application/use-cases/get-user-game-state/get-user-game-state.uc";
import { GamePresenter } from "../services/game.presenter";

@UseGuards(AuthGuard)
@Controller("game/private")
@ApiTags("Game")
export class GamePrivateController {
  constructor(
    private readonly presenter: GamePresenter,
    private readonly getUserGameStateUseCase: GetUserGameStateUseCase,
  ) {}

  @Get("get-user-game-state/:gameId")
  @Serialize(GetUserGameStateInputParamsDto)
  public async getUserGameState(
    @AuthUser() user: Request["user"],
    @Param() { gameId }: GetUserGameStateInputParamsDto,
  ): Promise<GetUserGameStateOutputDto> {
    const { game, playerCurrentlyPlaying, yourStatus } =
      await this.getUserGameStateUseCase.execute({
        userId: user.id,
        gameId,
      });

    const gameView = await this.presenter.toView(game);

    return {
      game: gameView,
      playerCurrentlyPlaying,
      yourStatus,
    };
  }
}
