import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HeroRepository } from "src/modules/game/application/repositories/hero-repository.interface";
import { Hero as HeroDomain } from "src/modules/game/domain/playable-entities/playable-entity/heroes/hero.abstract";
import { Repository } from "typeorm";
import { HeroEntity as HeroEntityPersistence } from "../entities/game-entity/playable-entity/hero.entity";
import { HeroMapper } from "../mappers/hero.mapper";

@Injectable()
export class HeroPostgresRepository implements HeroRepository {
  constructor(
    @InjectRepository(HeroEntityPersistence)
    private readonly heroRepository: Repository<HeroEntityPersistence>,
    private readonly heroMapper: HeroMapper,
  ) {}

  public async getOneOrThrow({
    heroId,
  }: { heroId: HeroEntityPersistence["id"] }): Promise<HeroDomain> {
    const hero = await this.heroRepository.findOneOrFail({
      where: {
        id: heroId,
      },
    });

    return this.heroMapper.toDomain(hero);
  }
}
