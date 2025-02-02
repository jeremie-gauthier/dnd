import { Injectable } from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import {
  GetHeroDetailsInputDto,
  GetHeroDetailsOutputDto,
} from "./get-hero-details.dto";
import { GetHeroDetailsRepository } from "./get-hero-details.repository";

@Injectable()
export class GetHeroDetailsUseCase implements UseCase {
  constructor(private readonly repository: GetHeroDetailsRepository) {}

  public async execute({
    heroId,
  }: GetHeroDetailsInputDto): Promise<GetHeroDetailsOutputDto> {
    const hero = await this.repository.getHero({ heroId });
    const heroUI = await this.repository.getHeroUI({ name: hero.name });
    return { ...hero, ...heroUI };
  }
}
