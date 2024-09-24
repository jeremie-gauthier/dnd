import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artifact } from "src/database/entities/artifact.entity";
import { ChestTrap } from "src/database/entities/chest-trap.entity";
import { DiceUI } from "src/database/entities/dice-ui.entity";
import { Dice } from "src/database/entities/dice.entity";
import { ItemUI } from "src/database/entities/item-ui.entity";
import { Item } from "src/database/entities/item.entity";
import { Potion } from "src/database/entities/potion.entity";
import { Spell } from "src/database/entities/spell.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { RedisModule } from "src/redis/redis.module";
import { DICE_REPOSITORY } from "../../application/repositories/dice-repository.interface";
import { GAME_REPOSITORY } from "../../application/repositories/game-repository.interface";
import { ITEM_DEV_REPOSITORY } from "../../application/repositories/item-dev-repository.interface";
import { ITEM_REPOSITORY } from "../../application/repositories/item-repository.interface";
import { ITEM_UI_REPOSITORY } from "../../application/repositories/item-ui-repository.interface";
import { PostgresDiceUIRepository } from "./dice-ui/dice-ui.repository";
import { DiceMapper } from "./dice/dice.mapper";
import { PostgresDiceRepository } from "./dice/dice.repository";
import { RedisGameRepository } from "./game/game.repository";
import { GameMapper } from "./game/mapper/game.mapper";
import { ItemDevMapper } from "./item-dev/item-dev.mapper";
import { PostgresItemDevRepository } from "./item-dev/item-dev.repository";
import { PostgresItemUIRepository } from "./item-ui/item-ui.repository";
import { ItemMapper } from "./item/item.mapper";
import { PostgresItemRepository } from "./item/item.repository";

@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forFeature([
      Dice,
      DiceUI,
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
      useClass: RedisGameRepository,
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
    PostgresDiceUIRepository,
  ],
  exports: [
    {
      provide: GAME_REPOSITORY,
      useClass: RedisGameRepository,
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
    PostgresDiceUIRepository,
  ],
})
export class DatabaseModule {}
