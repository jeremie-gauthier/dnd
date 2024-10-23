import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HeroUI } from "src/database/entities/hero-ui.entity";
import { Hero } from "src/database/entities/hero.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetHeroDetailsRepository {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
    @InjectRepository(HeroUI)
    private readonly heroUIRepository: Repository<HeroUI>,
  ) {}

  public getHero({ heroId }: { heroId: Hero["id"] }): Promise<Hero> {
    return this.heroRepository.findOneOrFail({
      where: {
        id: heroId,
      },
    });
  }

  public getHeroUI({ name }: { name: string }): Promise<HeroUI> {
    return this.heroUIRepository.findOneOrFail({
      select: { imgUrl: true },
      where: {
        name,
      },
    });
  }
}
