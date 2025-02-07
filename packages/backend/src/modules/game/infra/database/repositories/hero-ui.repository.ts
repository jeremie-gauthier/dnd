import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HeroTemplateUI as HeroTemplateUIPersistence } from "../entities/playable-entity-template/hero-template-ui.entity";

@Injectable()
export class HeroUIPostgresRepository {
  constructor(
    @InjectRepository(HeroTemplateUIPersistence)
    private readonly heroUIRepository: Repository<HeroTemplateUIPersistence>,
  ) {}

  public async getOneOrThrow({
    name,
  }: { name: string }): Promise<HeroTemplateUIPersistence> {
    return this.heroUIRepository.findOneOrFail({
      select: { imgUrl: true },
      where: {
        heroTemplate: {
          name,
        },
      },
      cache: true,
    });
  }
}
