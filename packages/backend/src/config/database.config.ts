import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AttackDice } from "../database/entities/attack-dice.entity";
import { AttackItem } from "../database/entities/attack-item.entity";
import { Attack } from "../database/entities/attack.entity";
import { CampaignProgression } from "../database/entities/campaign-progression.entity";
import { CampaignStageProgression } from "../database/entities/campaign-stage-progression.entity";
import { CampaignStage } from "../database/entities/campaign-stage.entity";
import { Campaign } from "../database/entities/campaign.entity";
import { Dice } from "../database/entities/dice.entity";
import { EnemyTemplate } from "../database/entities/enemy-template.entity";
import { HeroTemplate } from "../database/entities/hero-template.entity";
import { Hero } from "../database/entities/hero.entity";
import { Item } from "../database/entities/item.entity";
import { Perk } from "../database/entities/perk.entity";
import { Spell } from "../database/entities/spell.entity";
import { Stuff } from "../database/entities/stuff.entity";
import { Translation } from "../database/entities/translation.entity";
import { User } from "../database/entities/user.entity";
import { Weapon } from "../database/entities/weapon.entity";

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      url: process.env.DATABASE_URL,
      type: "postgres",
      entities: [
        User,
        Campaign,
        CampaignStage,
        CampaignProgression,
        CampaignStageProgression,
        Hero,
        HeroTemplate,
        Perk,
        Dice,
        Attack,
        AttackDice,
        Item,
        AttackItem,
        Weapon,
        Spell,
        Stuff,
        EnemyTemplate,
        Translation,
      ],
      migrationsRun: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
