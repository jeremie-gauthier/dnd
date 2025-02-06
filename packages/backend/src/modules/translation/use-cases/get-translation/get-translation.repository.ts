import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Translation } from "../../infra/database/entities/translation.entity";

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
