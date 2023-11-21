import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import envConfig, { validate } from './config/env.config';
import { DatabaseModule } from './database/database.module';
import { WsEventsModule } from './ws-events/ws-events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validate,
      cache: true,
    }),
    WsEventsModule,
    DatabaseModule,
    CampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
