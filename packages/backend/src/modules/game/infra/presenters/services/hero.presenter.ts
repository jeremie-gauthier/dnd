import { Injectable } from "@nestjs/common";
import { Hero } from "src/modules/game/domain/playable-entities/playable-entity/heroes/hero.abstract";
import { HeroUIPostgresRepository } from "../../database/repositories/hero-ui.repository";

@Injectable()
export class HeroPresenter {
  constructor(private readonly heroUIRepository: HeroUIPostgresRepository) {}

  public async toView({ hero }: { hero: ReturnType<Hero["toPlain"]> }) {
    const heroUI = await this.heroUIRepository.getOneOrThrow({
      name: hero.name,
    });

    return { ...hero, imgUrl: heroUI.imgUrl };
  }
}
