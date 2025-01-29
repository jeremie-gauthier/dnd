import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Serialize } from "src/middlewares/serialize.interceptor";
import {
  GetTranslationInputParamsDto,
  GetTranslationOutputDto,
} from "../../use-cases/get-translation/get-translation.dto";
import { GetTranslationUseCase } from "../../use-cases/get-translation/get-translation.uc";

@Controller("translation/public")
@ApiTags("Translation")
export class TranslationPublicController {
  constructor(private readonly getTranslationUseCase: GetTranslationUseCase) {}

  @Get("get-translation/:locale/:namespace")
  @Serialize(GetTranslationOutputDto)
  public async getTranslation(
    @Param() { locale, namespace }: GetTranslationInputParamsDto,
  ): Promise<GetTranslationOutputDto> {
    return await this.getTranslationUseCase.execute({ locale, namespace });
  }
}
