import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DataSource, DataSourceOptions } from "typeorm";
import { DatabaseConfiguration } from "./database.config";

export default NestFactory.create(ConfigModule.forRoot()).then(() => {
  const dataSourceOptions =
    new DatabaseConfiguration().createTypeOrmOptions() as DataSourceOptions;
  return new DataSource(dataSourceOptions);
});
