import { Jozan } from "src/modules/game/domain/playable-entities/playable-entity/heroes/jozan.hero";
import { Lidda } from "src/modules/game/domain/playable-entities/playable-entity/heroes/lidda.hero";
import { Mialye } from "src/modules/game/domain/playable-entities/playable-entity/heroes/mialye.hero";
import { Regdar } from "src/modules/game/domain/playable-entities/playable-entity/heroes/regdar.hero";

export class HeroFactory {
  private constructor() {}

  public static getHeroClass(heroName: string) {
    switch (heroName.toLowerCase()) {
      case "regdar":
        return Regdar;
      case "mialyë":
        return Mialye;
      case "jozan":
        return Jozan;
      case "lidda":
        return Lidda;
      default:
        throw new Error(`Hero ${heroName} not found`);
    }
  }
}
