import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ZodSerializerInterceptor, ZodValidationPipe } from "nestjs-zod";
import { AnalyticsModule } from "./analytics/analytics.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthzModule } from "./authz/authz.module";
import { CampaignModule } from "./campaign/campaign.module";
import { LoggerMiddleware } from "./common/logger.middleware";
import envConfig, { validate } from "./config/env.config";
import redis from "./config/redis.config";
import typeorm from "./config/typeorm.config";
import { GameModule } from "./game/game.module";
import { LobbyModule } from "./lobby/lobby.module";
import { RedisModule } from "./redis/redis.module";
import { UserModule } from "./user/user.module";
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig, typeorm, redis],
      validate,
      cache: true,
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    TypeOrmModule.forRootAsync({
      extraProviders: [ConfigService],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getOrThrow("typeorm"),
    }),
    AuthModule,
    CampaignModule,
    AnalyticsModule,
    LobbyModule,
    GameModule,
    UserModule,
    AuthzModule,
    RedisModule,
    TranslationModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
