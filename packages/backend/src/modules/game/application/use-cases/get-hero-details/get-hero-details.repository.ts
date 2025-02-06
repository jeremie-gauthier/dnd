import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HeroTemplateUI } from "src/modules/game/infra/database/entities/playable-entity-template/hero-template-ui.entity";
import { HeroEntity } from "src/modules/game/infra/database/entities/playable-entity/hero.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetHeroDetailsRepository {
  constructor(
    @InjectRepository(HeroEntity)
    private readonly heroRepository: Repository<HeroEntity>,
    @InjectRepository(HeroTemplateUI)
    private readonly heroTemplateUIRepository: Repository<HeroTemplateUI>,
  ) {}

  public getHero({
    heroId,
  }: { heroId: HeroEntity["id"] }): Promise<HeroEntity> {
    return this.heroRepository.findOneOrFail({
      where: {
        id: heroId,
      },
    });
  }

  public getHeroUI({ name }: { name: string }): Promise<HeroTemplateUI> {
    return this.heroTemplateUIRepository.findOneOrFail({
      select: { imgUrl: true },
      where: {
        heroTemplate: {
          name,
        },
      },
    });
  }
}
