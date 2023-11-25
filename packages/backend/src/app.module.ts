import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import envConfig, { validate } from './config/env.config';
import { DatabaseModule } from './database/database.module';
import { EntityModule } from './entity/entity.module';
import { GameModule } from './game/game.module';
import { ItemModule } from './item/item.module';
import { LobbyModule } from './lobby/lobby.module';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validate,
      cache: true,
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    DatabaseModule,
    CampaignModule,
    ItemModule,
    EntityModule,
    AnalyticsModule,
    LobbyModule,
    GameModule,
    MapModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
