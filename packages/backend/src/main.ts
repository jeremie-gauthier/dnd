import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

// ? https://github.com/nestjs/nest/issues/7249
import { EventEmitter } from "node:events";
(EventEmitter.prototype as any)._maxListeners = 15;
// ? ---

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.on("unhandledRejection", (reason: unknown) => {
    console.error("UnhandledRejection thrown. Reason:", reason);
  });

  app.enableShutdownHooks();

  app.enableCors();

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<string>("PORT");
  await app.listen(PORT, "0.0.0.0");
}

bootstrap().catch((err) => {
  console.error("Error at bootstrap:", err);
});
