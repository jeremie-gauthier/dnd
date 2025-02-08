import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DICE_REPOSITORY } from "../../application/repositories/dice-repository.interface";
import { GAME_PROGRESSION_REPOSITORY } from "../../application/repositories/game-progression-repository.interface";
import { GAME_REPOSITORY } from "../../application/repositories/game-repository.interface";
import { GAME_TEMPLATE_REPOSITORY } from "../../application/repositories/game-template-repository.interface";
import { HERO_REPOSITORY } from "../../application/repositories/hero-repository.interface";
import { ITEM_DEV_REPOSITORY } from "../../application/repositories/item-dev-repository.interface";
import { ITEM_REPOSITORY } from "../../application/repositories/item-repository.interface";
import { ITEM_UI_REPOSITORY } from "../../application/repositories/item-ui-repository.interface";
import { HeroEntity } from "./entities/game-entity/playable-entity/hero.entity";
import { PlayableEntity } from "./entities/game-entity/playable-entity/playable-entity.entity";
import { HeroTemplateUI } from "./entities/game-entity/playable-entity/template/hero-template-ui.entity";
import { HeroTemplate } from "./entities/game-entity/playable-entity/template/hero-template.entity";
import { GameProgression } from "./entities/game-progression.entity";
import { GameTemplate } from "./entities/game-template.entity";
import { Game } from "./entities/game.entity";
import { Artifact } from "./entities/item/artifact.entity";
import { Spell } from "./entities/item/attack-item/spell/spell.entity";
import { Weapon } from "./entities/item/attack-item/weapon.entity";
import { ChestTrap } from "./entities/item/chest-trap.entity";
import { Dice } from "./entities/item/dice/dice.entity";
import { ItemUI } from "./entities/item/item-ui.entity";
import { Item } from "./entities/item/item.entity";
import { Potion } from "./entities/item/potion.entity";
import { MonsterKilled } from "./entities/monster-killed.entity";
import { Room } from "./entities/room/room.entity";
import { BoardMapper } from "./mappers/board.mapper";
import { DiceMapper } from "./mappers/dice.mapper";
import { GameMapper } from "./mappers/game.mapper";
import { HeroTemplateMapper } from "./mappers/hero-template.mapper";
import { HeroMapper } from "./mappers/hero.mapper";
import { ItemDevMapper } from "./mappers/item-dev.mapper";
import { ItemMapper } from "./mappers/item.mapper";
import { DicePostgresRepository } from "./repositories/dice.repository";
import { GameProgressionPostgresRepository } from "./repositories/game-progression.repository";
import { GameTemplatePostgresRepository } from "./repositories/game-template.repository";
import { GamePostgresRepository } from "./repositories/game.repository";
import { HeroUIPostgresRepository } from "./repositories/hero-ui.repository";
import { HeroPostgresRepository } from "./repositories/hero.repository";
import { ItemDevPostgresRepository } from "./repositories/item-dev.repository";
import { ItemUIPostgresRepository } from "./repositories/item-ui.repository";
import { ItemPostgresRepository } from "./repositories/item.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Game,
      GameTemplate,
      GameProgression,
      HeroTemplate,
      HeroTemplateUI,
      Dice,
      Item,
      ItemUI,
      Weapon,
      Spell,
      ChestTrap,
      Potion,
      Artifact,
      HeroEntity,
      Room,
      PlayableEntity,
      MonsterKilled,
    ]),
  ],
  providers: [
    {
      provide: GAME_REPOSITORY,
      useClass: GamePostgresRepository,
    },
    GameMapper,
    {
      provide: DICE_REPOSITORY,
      useClass: DicePostgresRepository,
    },
    DiceMapper,
    {
      provide: ITEM_REPOSITORY,
      useClass: ItemPostgresRepository,
    },
    ItemMapper,
    {
      provide: ITEM_UI_REPOSITORY,
      useClass: ItemUIPostgresRepository,
    },
    {
      provide: ITEM_DEV_REPOSITORY,
      useClass: ItemDevPostgresRepository,
    },
    ItemDevMapper,
    {
      provide: GAME_PROGRESSION_REPOSITORY,
      useClass: GameProgressionPostgresRepository,
    },
    {
      provide: HERO_REPOSITORY,
      useClass: HeroPostgresRepository,
    },
    HeroUIPostgresRepository,
    HeroTemplateMapper,
    {
      provide: GAME_TEMPLATE_REPOSITORY,
      useClass: GameTemplatePostgresRepository,
    },
    BoardMapper,
    HeroMapper,
  ],
  exports: [
    {
      provide: GAME_REPOSITORY,
      useClass: GamePostgresRepository,
    },
    {
      provide: DICE_REPOSITORY,
      useClass: DicePostgresRepository,
    },
    {
      provide: ITEM_REPOSITORY,
      useClass: ItemPostgresRepository,
    },
    {
      provide: ITEM_UI_REPOSITORY,
      useClass: ItemUIPostgresRepository,
    },
    {
      provide: ITEM_DEV_REPOSITORY,
      useClass: ItemDevPostgresRepository,
    },
    {
      provide: GAME_PROGRESSION_REPOSITORY,
      useClass: GameProgressionPostgresRepository,
    },
    {
      provide: HERO_REPOSITORY,
      useClass: HeroPostgresRepository,
    },
    HeroUIPostgresRepository,
    {
      provide: GAME_TEMPLATE_REPOSITORY,
      useClass: GameTemplatePostgresRepository,
    },
    BoardMapper,
    HeroMapper,
  ],
})
export class DatabaseModule {}
