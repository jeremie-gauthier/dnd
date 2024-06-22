import { GetHeroDetailsInput, GetHeroDetailsOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import { GetHeroDetailsRepository } from "./get-hero-details.repository";

@Injectable()
export class GetHeroDetailsUseCase implements UseCase {
  constructor(private readonly repository: GetHeroDetailsRepository) {}

  public async execute({
    heroId,
  }: GetHeroDetailsInput): Promise<GetHeroDetailsOutput> {
    const hero = await this.repository.getHero({ heroId });
    return hero;
  }
}
