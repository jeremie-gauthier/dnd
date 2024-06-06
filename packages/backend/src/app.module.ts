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
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import envConfig, { validate } from "./config/env.config";
import redis from "./config/redis.config";
import typeorm from "./config/typeorm.config";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthzModule } from "./modules/authz/authz.module";
import { CampaignModule } from "./modules/campaign/campaign.module";
import { GameModule } from "./modules/game/game.module";
import { LobbyModule } from "./modules/lobby/lobby.module";
import { TranslationModule } from "./modules/translation/translation.module";
import { UserModule } from "./modules/user/user.module";
import { RedisModule } from "./redis/redis.module";

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
