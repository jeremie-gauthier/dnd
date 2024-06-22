import { Controller, Get, Param } from "@nestjs/common";
import { ZodSerializerDto } from "nestjs-zod";
import {
  GetTranslationInputDto,
  GetTranslationOutputDto,
} from "../../use-cases/get-translation/get-translation.dto";
import { GetTranslationUseCase } from "../../use-cases/get-translation/get-translation.uc";

@Controller("translation/public")
export class TranslationPublicController {
  constructor(private readonly getTranslationUseCase: GetTranslationUseCase) {}

  @Get("get-translation/:locale/:namespace")
  @ZodSerializerDto(GetTranslationOutputDto)
  public async getLobbies(
    @Param() { locale, namespace }: GetTranslationInputDto,
  ): Promise<GetTranslationOutputDto> {
    return await this.getTranslationUseCase.execute({ locale, namespace });
  }
}
