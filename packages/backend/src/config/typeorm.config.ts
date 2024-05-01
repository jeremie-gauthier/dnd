import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AttackItem } from "../database/entities/attack-item.entity";
import { Attack } from "../database/entities/attack.entity";
import { CampaignProgression } from "../database/entities/campaign-progression.entity";
import { CampaignStageProgression } from "../database/entities/campaign-stage-progression.entity";
import { CampaignStage } from "../database/entities/campaign-stage.entity";
import { Campaign } from "../database/entities/campaign.entity";
import { Dice } from "../database/entities/dice.entity";
import { HeroTemplate } from "../database/entities/hero-template.entity";
import { Hero } from "../database/entities/hero.entity";
import { Item } from "../database/entities/item.entity";
import { Perk } from "../database/entities/perk.entity";
import { Spell } from "../database/entities/spell.entity";
import { User } from "../database/entities/user.entity";
import { Weapon } from "../database/entities/weapon.entity";

dotenvConfig({ path: ".env" });

const config: DataSourceOptions = {
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
    Item,
    AttackItem,
    Weapon,
    Spell,
  ],
  migrations: ["dist/src/database/migrations/*.js"],
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config);
