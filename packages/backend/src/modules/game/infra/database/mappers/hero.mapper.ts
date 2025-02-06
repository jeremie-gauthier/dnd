import { Injectable } from "@nestjs/common";
import { Hero as HeroDomain } from "src/modules/game/domain/playable-entities/playable-entity/heroes/hero.abstract";
import { Mapper } from "src/modules/shared/infra/mapper";
import { HeroEntity as HeroEntityPersistence } from "../entities/playable-entity/hero.entity";
import { PlayableEntityFactory } from "./factories/playable-entity.factory";

@Injectable()
export class HeroMapper extends Mapper<HeroEntityPersistence, HeroDomain> {
  public toDomain(persistence: HeroEntityPersistence): HeroDomain {
    return PlayableEntityFactory.create(persistence) as HeroDomain;
  }

  public toPersistence(domain: HeroDomain): HeroEntityPersistence {
    throw new Error("Method not implemented.");
  }
}
