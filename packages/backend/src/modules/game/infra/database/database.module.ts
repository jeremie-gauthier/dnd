import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from "src/redis/redis.module";
import { DICE_REPOSITORY } from "../../application/repositories/dice-repository.interface";
import { GAME_REPOSITORY } from "../../application/repositories/game-repository.interface";
import { ITEM_DEV_REPOSITORY } from "../../application/repositories/item-dev-repository.interface";
import { ITEM_REPOSITORY } from "../../application/repositories/item-repository.interface";
import { ITEM_UI_REPOSITORY } from "../../application/repositories/item-ui-repository.interface";
import { DiceMapper } from "./dice/dice.mapper";
import { PostgresDiceRepository } from "./dice/dice.repository";
import { Artifact } from "./entities/item/artifact.entity";
import { Spell } from "./entities/item/attack-item/spell/spell.entity";
import { Weapon } from "./entities/item/attack-item/weapon.entity";
import { ChestTrap } from "./entities/item/chest-trap.entity";
import { Dice } from "./entities/item/dice.entity";
import { ItemUI } from "./entities/item/item-ui.entity";
import { Item } from "./entities/item/item.entity";
import { Potion } from "./entities/item/potion.entity";
import { HeroTemplateUI } from "./entities/playable-entity-template/hero-template-ui.entity";
import { GameMapper } from "./mappers/game.mapper";
import { ItemDevMapper } from "./mappers/item-dev.mapper";
import { ItemMapper } from "./mappers/item.mapper";
import { PostgresGameRepository } from "./repositories/game.postgres-repository";
import { PostgresHeroUIRepository } from "./repositories/hero-ui.repository";
import { PostgresItemDevRepository } from "./repositories/item-dev.repository";
import { PostgresItemUIRepository } from "./repositories/item-ui.repository";
import { PostgresItemRepository } from "./repositories/item.repository";

@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forFeature([
      HeroTemplateUI,
      Dice,
      Item,
      ItemUI,
      Weapon,
      Spell,
      ChestTrap,
      Potion,
      Artifact,
    ]),
  ],
  providers: [
    {
      provide: GAME_REPOSITORY,
      useClass: PostgresGameRepository,
    },
    GameMapper,
    {
      provide: DICE_REPOSITORY,
      useClass: PostgresDiceRepository,
    },
    DiceMapper,
    {
      provide: ITEM_REPOSITORY,
      useClass: PostgresItemRepository,
    },
    {
      provide: ITEM_UI_REPOSITORY,
      useClass: PostgresItemUIRepository,
    },
    {
      provide: ITEM_DEV_REPOSITORY,
      useClass: PostgresItemDevRepository,
    },
    ItemMapper,
    ItemDevMapper,
    PostgresHeroUIRepository,
  ],
  exports: [
    {
      provide: GAME_REPOSITORY,
      useClass: PostgresGameRepository,
    },
    {
      provide: DICE_REPOSITORY,
      useClass: PostgresDiceRepository,
    },
    {
      provide: ITEM_REPOSITORY,
      useClass: PostgresItemRepository,
    },
    {
      provide: ITEM_UI_REPOSITORY,
      useClass: PostgresItemUIRepository,
    },
    {
      provide: ITEM_DEV_REPOSITORY,
      useClass: PostgresItemDevRepository,
    },
    PostgresHeroUIRepository,
  ],
})
export class DatabaseModule {}
