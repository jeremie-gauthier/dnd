import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CampaignProgression } from '../database/entities/campaign-progression.entity';
import { CampaignStageProgression } from '../database/entities/campaign-stage-progression.entity';
import { CampaignStage } from '../database/entities/campaign-stage.entity';
import { Campaign } from '../database/entities/campaign.entity';
import { HeroTemplate } from '../database/entities/hero-template.entity';
import { Hero } from '../database/entities/hero.entity';
import { User } from '../database/entities/user.entity';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  entities: [
    User,
    Campaign,
    CampaignStage,
    CampaignProgression,
    CampaignStageProgression,
    Hero,
    HeroTemplate,
  ],
  migrations: ['dist/src/database/migrations/*.js'],
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
