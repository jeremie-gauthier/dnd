import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Translation } from "src/database/entities/translation.entity";
import { GetTranslationRepository } from "./get-translation/get-translation.repository";
import { GetTranslationUseCase } from "./get-translation/get-translation.uc";
import { TranslationPublicController } from "./translation.public-controller";

@Module({
  imports: [TypeOrmModule.forFeature([Translation])],
  providers: [GetTranslationUseCase, GetTranslationRepository],
  controllers: [TranslationPublicController],
})
export class TranslationModule {}
