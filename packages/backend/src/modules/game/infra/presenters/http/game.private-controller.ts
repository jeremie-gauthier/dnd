import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Request } from "express";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { Serialize } from "src/middlewares/serialize.interceptor";
import {
  GetHeroDetailsInputDto,
  GetHeroDetailsOutputDto,
} from "src/modules/game/application/use-cases/get-hero-details/get-hero-details.dto";
import { GetHeroDetailsUseCase } from "src/modules/game/application/use-cases/get-hero-details/get-hero-details.uc";
import {
  GetUserGameStateInputParamsDto,
  GetUserGameStateOutputDto,
} from "src/modules/game/application/use-cases/get-user-game-state/get-user-game-state.dto";
import { GetUserGameStateUseCase } from "src/modules/game/application/use-cases/get-user-game-state/get-user-game-state.uc";
import { GamePresenter } from "../services/game.presenter";
import { HeroPresenter } from "../services/hero.presenter";

@UseGuards(AuthGuard)
@Controller("game/private")
@ApiTags("Game")
export class GamePrivateController {
  constructor(
    private readonly gamePresenter: GamePresenter,
    private readonly heroPresenter: HeroPresenter,
    private readonly getUserGameStateUseCase: GetUserGameStateUseCase,
    private readonly getHeroDetailsUseCase: GetHeroDetailsUseCase,
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

    const gameView = await this.gamePresenter.toView(game);

    return {
      game: gameView,
      playerCurrentlyPlaying,
      yourStatus,
    };
  }

  @Get("get-hero-details/:heroId")
  @Serialize(GetHeroDetailsOutputDto)
  public async getHeroDetails(
    @Param() params: GetHeroDetailsInputDto,
  ): Promise<GetHeroDetailsOutputDto> {
    const hero = await this.getHeroDetailsUseCase.execute(params);

    const heroView = await this.heroPresenter.toView({ hero });

    return heroView;
  }
}
