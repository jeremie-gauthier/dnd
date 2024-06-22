import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Translation } from "src/database/entities/translation.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetTranslationRepository {
  constructor(
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
  ) {}

  public getTranslation({
    locale,
    namespace,
  }: Pick<Translation, "locale" | "namespace">): Promise<Translation> {
    return this.translationRepository.findOneOrFail({
      where: {
        locale,
        namespace,
      },
    });
  }
}
