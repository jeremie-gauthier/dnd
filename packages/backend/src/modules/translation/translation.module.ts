import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Translation } from "src/database/entities/translation.entity";
import { TranslationPublicController } from "./infra/controller/translation.public-controller";
import { GetTranslationRepository } from "./use-cases/get-translation/get-translation.repository";
import { GetTranslationUseCase } from "./use-cases/get-translation/get-translation.uc";

@Module({
  imports: [TypeOrmModule.forFeature([Translation])],
  controllers: [TranslationPublicController],
  providers: [GetTranslationUseCase, GetTranslationRepository],
})
export class TranslationModule {}
