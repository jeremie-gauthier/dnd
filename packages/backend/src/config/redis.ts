import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const config = {
  store: process.env.DATABASE_URL,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

export default registerAs('redis', () => config);
