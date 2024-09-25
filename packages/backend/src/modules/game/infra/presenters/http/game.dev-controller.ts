import {
  Controller,
  NotFoundException,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { CreateItemsFromCsvUseCase } from "src/modules/game/application/use-cases/create-items-from-csv/create-items-from-csv.uc";

@Controller("game/dev")
export class GameDevController {
  constructor(
    private readonly configService: ConfigService,
    private readonly createItemsFromCsvUseCase: CreateItemsFromCsvUseCase,
  ) {}

  @Post("create-items")
  @UseInterceptors(FileInterceptor("file"))
  public async createItems(@UploadedFile() file: Express.Multer.File) {
    const env = this.configService.get("NODE_ENV");
    if (env !== "development") {
      throw new NotFoundException("Cannot POST /game/dev/create-items");
    }

    await this.createItemsFromCsvUseCase.execute({ file });
  }
}
