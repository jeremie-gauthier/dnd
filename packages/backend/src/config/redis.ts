import { registerAs } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const config = {
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

export default registerAs('redis', () => config);
