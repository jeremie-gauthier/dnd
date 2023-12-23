import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CampaignProgression } from '../database/entities/campaign-progression.entity';
import { CampaignStageProgression } from '../database/entities/campaign-stage-progression.entity';
import { CampaignStage } from '../database/entities/campaign-stage.entity';
import { Campaign } from '../database/entities/campaign.entity';
import { User } from '../database/entities/user.entity';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  entities: [User, Campaign, CampaignStage, CampaignProgression, CampaignStageProgression],
  migrations: ['dist/src/database/migrations/*.js'],
  migrationsRun: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
