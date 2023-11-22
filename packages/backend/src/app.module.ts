import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import envConfig, { validate } from './config/env.config';
import { DatabaseModule } from './database/database.module';
import { WsEventsModule } from './ws-events/ws-events.module';
import { ItemModule } from './item/item.module';
import { EntityModule } from './entity/entity.module';

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
    ItemModule,
    EntityModule,
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
