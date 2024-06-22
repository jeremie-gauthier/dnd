import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Hero } from "src/database/entities/hero.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetHeroDetailsRepository {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {}

  public getHero({ heroId }: { heroId: Hero["id"] }): Promise<Hero> {
    return this.heroRepository.findOneOrFail({
      where: {
        id: heroId,
      },
    });
  }
}
