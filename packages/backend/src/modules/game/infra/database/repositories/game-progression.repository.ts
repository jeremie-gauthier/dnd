import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameProgressionRepository } from "src/modules/game/application/repositories/game-progression-repository.interface";
import { Hero } from "src/modules/game/domain/playable-entities/playable-entity/heroes/hero.abstract";
import { Repository } from "typeorm";
import { GameProgression } from "../entities/game-progression.entity";
import { HeroTemplate } from "../entities/playable-entity-template/hero-template.entity";
import { HeroTemplateMapper } from "../mappers/hero-template.mapper";
import { HeroMapper } from "../mappers/hero.mapper";

@Injectable()
export class GameProgressionPostgresRepository
  implements GameProgressionRepository
{
  constructor(
    @InjectRepository(GameProgression)
    private readonly gameProgressionRepository: Repository<GameProgression>,
    @InjectRepository(HeroTemplate)
    private readonly heroTemplateRepository: Repository<HeroTemplate>,
    private readonly heroMapper: HeroMapper,
    private readonly heroTemplateMapper: HeroTemplateMapper,
  ) {}

  public async getHeroes({
    campaignId,
    userId,
  }: { campaignId: string; userId: string }): Promise<Array<Hero>> {
    const gameProgression = await this.gameProgressionRepository.findOne({
      where: {
        campaignId,
        userId,
      },
      relations: {
        heroes: {
          inventory: {
            stuff: {
              // TODO: retrouver la technique pour avoir tous les objets ici
              // TODO: passer en raw sql si c'est trop chiant
              item: true,
            },
          },
          conditions: true,
          actionsDoneThisTurn: true,
        },
      },
    });
    if (gameProgression) {
      return gameProgression.heroes.map((hero) =>
        this.heroMapper.toDomain(hero),
      );
    }

    const heroes = await this.heroTemplateRepository.find({
      where: {
        level: 1,
      },
      relations: {
        inventory: {
          stuff: {
            // TODO: fetch item and their attacks
            item: true,
          },
        },
      },
    });
    return heroes.map((hero) => this.heroTemplateMapper.toDomain(hero));
  }
}
