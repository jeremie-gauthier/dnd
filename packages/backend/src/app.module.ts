import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ZodSerializerInterceptor, ZodValidationPipe } from "nestjs-zod";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthzModule } from "./authz/authz.module";
import { DatabaseConfiguration } from "./config/database.config";
import envConfig, { validate } from "./config/env.config";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { CampaignModule } from "./modules/campaign/campaign.module";
import { GameModule } from "./modules/game/game.module";
import { LobbyModule } from "./modules/lobby/lobby.module";
import { TranslationModule } from "./modules/translation/translation.module";
import { UserModule } from "./modules/user/user.module";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [envConfig],
      validate,
      cache: true,
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    AuthzModule,
    RedisModule,
    CampaignModule,
    AnalyticsModule,
    LobbyModule,
    GameModule,
    UserModule,
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
