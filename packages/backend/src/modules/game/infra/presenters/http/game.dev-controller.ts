import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiExcludeController } from "@nestjs/swagger";
import { Express } from "express";
import { GameTemplateJson } from "src/modules/game/application/use-cases/create-game-template-from-json/create-game-template-from-json.interface";
import { CreateGameTemplateFromJsonUseCase } from "src/modules/game/application/use-cases/create-game-template-from-json/create-game-template-from-json.uc";
import { CreateItemsFromCsvUseCase } from "src/modules/game/application/use-cases/create-items-from-csv/create-items-from-csv.uc";

@Controller("game/dev")
@ApiExcludeController()
export class GameDevController {
  constructor(
    private readonly configService: ConfigService,
    private readonly createItemsFromCsvUseCase: CreateItemsFromCsvUseCase,
    private readonly createGameTemplateFromJsonUseCase: CreateGameTemplateFromJsonUseCase,
  ) {}

  @Post("create-items")
  @UseInterceptors(FileInterceptor("file"))
  public async createItems(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const env = this.configService.get("NODE_ENV");
    if (env !== "development") {
      throw new NotFoundException("Cannot POST /game/dev/create-items");
    }

    await this.createItemsFromCsvUseCase.execute({ file });
  }

  @Post("create-game-template")
  public async createGameTemplate(
    @Body() gameTemplate: GameTemplateJson,
  ): Promise<void> {
    const env = this.configService.get("NODE_ENV");
    if (env !== "development") {
      throw new NotFoundException("Cannot POST /game/dev/create-game-template");
    }

    await this.createGameTemplateFromJsonUseCase.execute({ gameTemplate });
  }
}
