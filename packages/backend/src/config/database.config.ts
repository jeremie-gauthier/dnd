import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Analytics } from "../modules/analytics/infra/database/entities/analytics.entity";
import { CampaignProgression } from "../modules/campaign/infra/database/entities/campaign-progression.entity";
import { CampaignStageProgression } from "../modules/campaign/infra/database/entities/campaign-stage-progression.entity";
import { CampaignStage } from "../modules/campaign/infra/database/entities/campaign-stage.entity";
import { Campaign } from "../modules/campaign/infra/database/entities/campaign.entity";
import { ActionHistory } from "../modules/game/infra/database/entities/action-history.entity";
import { Board } from "../modules/game/infra/database/entities/board.entity";
import { GameEvent } from "../modules/game/infra/database/entities/game-event/game-event.entity";
import { OnDoorOpening } from "../modules/game/infra/database/entities/game-event/on-door-opening.entity";
import { GameProgression } from "../modules/game/infra/database/entities/game-progression.entity";
import { GameTemplate } from "../modules/game/infra/database/entities/game-template.entity";
import { Game } from "../modules/game/infra/database/entities/game.entity";
import { Artifact } from "../modules/game/infra/database/entities/item/artifact.entity";
import { AttackDice } from "../modules/game/infra/database/entities/item/attack-item/attack-dice.entity";
import { Attack } from "../modules/game/infra/database/entities/item/attack-item/attack.entity";
import { ManaCost } from "../modules/game/infra/database/entities/item/attack-item/spell/mana-cost.entity";
import { Spell } from "../modules/game/infra/database/entities/item/attack-item/spell/spell.entity";
import { Weapon } from "../modules/game/infra/database/entities/item/attack-item/weapon.entity";
import { ChestTrap } from "../modules/game/infra/database/entities/item/chest-trap.entity";
import { Dice } from "../modules/game/infra/database/entities/item/dice.entity";
import { ItemUI } from "../modules/game/infra/database/entities/item/item-ui.entity";
import { Item } from "../modules/game/infra/database/entities/item/item.entity";
import { Perk } from "../modules/game/infra/database/entities/item/perk.entity";
import { Potion } from "../modules/game/infra/database/entities/item/potion.entity";
import { MonsterKilled } from "../modules/game/infra/database/entities/monster-killed.entity";
import { PlayableEntityCondition } from "../modules/game/infra/database/entities/playable-entity-condition.entity";
import { HeroTemplateUI } from "../modules/game/infra/database/entities/playable-entity-template/hero-template-ui.entity";
import { HeroTemplate } from "../modules/game/infra/database/entities/playable-entity-template/hero-template.entity";
import { MonsterTemplateUI } from "../modules/game/infra/database/entities/playable-entity-template/monster-template-ui.entity";
import { MonsterTemplate } from "../modules/game/infra/database/entities/playable-entity-template/monster-template.entity";
import { HeroEntity } from "../modules/game/infra/database/entities/playable-entity/hero.entity";
import { Inventory } from "../modules/game/infra/database/entities/playable-entity/inventory.entity";
import { MonsterEntity } from "../modules/game/infra/database/entities/playable-entity/monster.entity";
import { PlayableEntity } from "../modules/game/infra/database/entities/playable-entity/playable-entity.entity";
import { Stuff } from "../modules/game/infra/database/entities/playable-entity/stuff.entity";
import { BoundingBox } from "../modules/game/infra/database/entities/room/bounding-box.entity";
import { Room } from "../modules/game/infra/database/entities/room/room.entity";
import { TileEntity } from "../modules/game/infra/database/entities/tile-entity/tile-entity.entity";
import { ChestEntity } from "../modules/game/infra/database/entities/tile-entity/tile-non-playable-interactive-entity/chest-entity.entity";
import { DoorEntity } from "../modules/game/infra/database/entities/tile-entity/tile-non-playable-interactive-entity/door-entity.entity";
import { TileNonPlayableInteractiveEntity } from "../modules/game/infra/database/entities/tile-entity/tile-non-playable-interactive-entity/tile-non-playable-interactive-entity.entity";
import { TrapEntity } from "../modules/game/infra/database/entities/tile-entity/tile-non-playable-interactive-entity/trap-entity.entity";
import { TileNonPlayableNonInteractiveEntity } from "../modules/game/infra/database/entities/tile-entity/tile-non-playable-non-interactive-entity/tile-non-playable-non-interactive-entity.entity";
import { TilePlayableEntity } from "../modules/game/infra/database/entities/tile-entity/tile-playable-entity/tile-playable-entity.entity";
import { Tile } from "../modules/game/infra/database/entities/tile.entity";
import { DefeatAllMonsters } from "../modules/game/infra/database/entities/win-condition/defeat-all-monster.entity";
import { WinCondition } from "../modules/game/infra/database/entities/win-condition/win-condition.entity";
import { Lobby } from "../modules/lobby/infra/database/entities/lobby.entity";
import { PlayableCharacter } from "../modules/lobby/infra/database/entities/playable-character.entity";
import { Player } from "../modules/lobby/infra/database/entities/player.entity";
import { Translation } from "../modules/translation/infra/database/entities/translation.entity";
import { User } from "../modules/user/infra/database/entities/user.entity";

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      url: process.env.DATABASE_URL,
      type: "postgres",
      entities: [
        // analytics
        Analytics,

        // campaign
        Campaign,
        CampaignStage,
        CampaignProgression,
        CampaignStageProgression,

        // translation
        Translation,

        // user
        User,

        // lobby
        Lobby,
        PlayableCharacter,
        Player,

        // game
        GameEvent,
        OnDoorOpening,
        Attack,
        AttackDice,
        Dice,
        ManaCost,
        Perk,
        Item,
        ItemUI,
        Artifact,
        ChestTrap,
        Potion,
        Weapon,
        Spell,
        PlayableEntity,
        HeroEntity,
        MonsterEntity,
        Inventory,
        Stuff,
        HeroTemplate,
        HeroTemplateUI,
        MonsterTemplate,
        MonsterTemplateUI,
        Room,
        BoundingBox,
        Tile,
        TileEntity,
        TilePlayableEntity,
        TileNonPlayableInteractiveEntity,
        ChestEntity,
        DoorEntity,
        TrapEntity,
        TileNonPlayableNonInteractiveEntity,
        WinCondition,
        DefeatAllMonsters,
        ActionHistory,
        Board,
        GameProgression,
        Game,
        MonsterKilled,
        PlayableEntityCondition,
        GameTemplate,
      ],
      migrations: ["dist/src/database/migrations/*.js"],
      migrationsRun: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
