import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dice } from "src/database/entities/dice.entity";
import { Item } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { RedisModule } from "src/redis/redis.module";
import { DICE_REPOSITORY } from "../../application/repositories/dice-repository.interface";
import { GAME_REPOSITORY } from "../../application/repositories/game-repository.interface";
import { ITEM_REPOSITORY } from "../../application/repositories/item-repository.interface";
import { DiceMapper } from "./dice/dice.mapper";
import { PostgresDiceRepository } from "./dice/dice.repository";
import { RedisGameRepository } from "./game/game.repository";
import { GameMapper } from "./game/mapper/game.mapper";
import { ItemMapper } from "./item/item.mapper";
import { PostgresItemRepository } from "./item/item.repository";

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([Dice, Item, Weapon, Spell])],
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
    ItemMapper,
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
  ],
})
export class DatabaseModule {}
