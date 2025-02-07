import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import {
  HERO_REPOSITORY,
  HeroRepository,
} from "../../repositories/hero-repository.interface";
import { GetHeroDetailsInputDto } from "./get-hero-details.dto";

@Injectable()
export class GetHeroDetailsUseCase implements UseCase {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly heroRepository: HeroRepository,
  ) {}

  public async execute({ heroId }: GetHeroDetailsInputDto) {
    const hero = await this.heroRepository.getOneOrThrow({ heroId });
    return hero.toPlain();
  }
}
