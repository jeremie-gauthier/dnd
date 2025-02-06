import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
  GameStatus,
  GameStatusType,
} from "src/modules/game/infra/database/enums/game-status.enum";
import { InteractiveEntityKind } from "src/modules/game/infra/database/enums/interactive-entity-kind.enum";
import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import { PlayableEntityFaction } from "src/modules/game/infra/database/enums/playable-entity-faction.enum";
import { TileEntityType } from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { ArtifactResponseDto } from "./artifact.dto";
import { BoardResponseDto } from "./board.dto";
import { ChestEntityResponseDto } from "./chest-entity.dto";
import { ChestTrapResponseDto } from "./chest-trap.dto";
import { DoorEntityResponseDto } from "./door-entity.dto";
import { GameMasterResponseDto } from "./game-master.dto";
import { HeroEntityResponseDto } from "./hero-entity.dto";
import { InventoryResponseDto } from "./inventory.dto";
import { ItemResponseDto } from "./item.dto";
import { MonsterEntityResponseDto } from "./monster-entity.dto";
import { PlayableEntityResponseDto } from "./playable-entity.dto";
import { PotionResponseDto } from "./potion.dto";
import { SpellResponseDto } from "./spell.dto";
import { TileEntityResponseDto } from "./tile-entity.dto";
import { TileNonPlayableInteractiveEntityResponseDto } from "./tile-non-playable-interactive-entity.dto";
import { TileNonPlayableNonInteractiveEntityResponseDto } from "./tile-non-playable-non-interactive-entity.dto";
import { TilePlayableEntityResponseDto } from "./tile-playable-entity.dto";
import { TileResponseDto } from "./tile.dto";
import { TrapEntityResponseDto } from "./trap-entity.dto";
import { WeaponResponseDto } from "./weapon.dto";

@ApiExtraModels(
  TileNonPlayableNonInteractiveEntityResponseDto,
  TileNonPlayableInteractiveEntityResponseDto,
  TilePlayableEntityResponseDto,
  ChestEntityResponseDto,
  DoorEntityResponseDto,
  TrapEntityResponseDto,
  TileEntityResponseDto,
)
class Tile extends TileResponseDto {
  @Expose()
  @Type(() => TileEntityResponseDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: [
        {
          value: TileNonPlayableNonInteractiveEntityResponseDto,
          name: TileEntityType.NON_INTERACTIVE_ENTITY,
        },
        {
          value: TilePlayableEntityResponseDto,
          name: TileEntityType.PLAYABLE_ENTITY,
        },
        {
          value: TileNonPlayableInteractiveEntityResponseDto,
          name: TileEntityType.INTERACTIVE_ENTITY,
        },
      ],
    },
  })
  @ApiProperty({
    type: "array",
    items: {
      oneOf: [
        { $ref: getSchemaPath(TileNonPlayableNonInteractiveEntityResponseDto) },
        { $ref: getSchemaPath(TilePlayableEntityResponseDto) },
        {
          oneOf: [
            { $ref: getSchemaPath(ChestEntityResponseDto) },
            { $ref: getSchemaPath(DoorEntityResponseDto) },
            { $ref: getSchemaPath(TrapEntityResponseDto) },
          ],
          discriminator: {
            propertyName: "kind",
            mapping: {
              [InteractiveEntityKind.CHEST]: "ChestEntityResponseDto",
              [InteractiveEntityKind.DOOR]: "DoorEntityResponseDto",
              [InteractiveEntityKind.TRAP]: "TrapEntityResponseDto",
            },
          },
        },
      ],
      discriminator: {
        propertyName: "type",
        mapping: {
          [TileEntityType.NON_INTERACTIVE_ENTITY]:
            "TileNonPlayableNonInteractiveEntityResponseDto",
          [TileEntityType.PLAYABLE_ENTITY]: "TilePlayableEntityResponseDto",
        },
      },
    },
  })
  readonly entities: Array<TileEntityResponseDto>;
}

class Board extends BoardResponseDto {
  @Expose()
  @Type(() => Tile)
  readonly tiles: Array<Tile>;
}

@ApiExtraModels(
  WeaponResponseDto,
  SpellResponseDto,
  ArtifactResponseDto,
  PotionResponseDto,
  ChestTrapResponseDto,
  ItemResponseDto,
)
class Inventory extends InventoryResponseDto {
  @Expose()
  @Type(() => ItemResponseDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: [
        { value: WeaponResponseDto, name: ItemType.WEAPON },
        { value: SpellResponseDto, name: ItemType.SPELL },
        { value: ArtifactResponseDto, name: ItemType.ARTIFACT },
      ],
    },
  })
  @ApiProperty({
    type: "array",
    items: {
      oneOf: [
        { $ref: getSchemaPath(WeaponResponseDto) },
        { $ref: getSchemaPath(SpellResponseDto) },
        { $ref: getSchemaPath(ArtifactResponseDto) },
      ],
      discriminator: {
        propertyName: "type",
        mapping: {
          [ItemType.WEAPON]: "WeaponResponseDto",
          [ItemType.SPELL]: "SpellResponseDto",
          [ItemType.ARTIFACT]: "ArtifactResponseDto",
        },
      },
    },
  })
  readonly gear: Array<
    WeaponResponseDto | SpellResponseDto | ArtifactResponseDto
  >;

  @Expose()
  @Type(() => ItemResponseDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: [
        { value: WeaponResponseDto, name: ItemType.WEAPON },
        { value: SpellResponseDto, name: ItemType.SPELL },
        { value: ArtifactResponseDto, name: ItemType.ARTIFACT },
        { value: PotionResponseDto, name: ItemType.POTION },
      ],
    },
  })
  @ApiProperty({
    type: "array",
    items: {
      oneOf: [
        { $ref: getSchemaPath(WeaponResponseDto) },
        { $ref: getSchemaPath(SpellResponseDto) },
        { $ref: getSchemaPath(ArtifactResponseDto) },
        { $ref: getSchemaPath(PotionResponseDto) },
      ],
      discriminator: {
        propertyName: "type",
        mapping: {
          [ItemType.WEAPON]: "WeaponResponseDto",
          [ItemType.SPELL]: "SpellResponseDto",
          [ItemType.ARTIFACT]: "ArtifactResponseDto",
          [ItemType.POTION]: "PotionResponseDto",
        },
      },
    },
  })
  readonly backpack: Array<
    | WeaponResponseDto
    | SpellResponseDto
    | ArtifactResponseDto
    | PotionResponseDto
  >;
}

class PlayableMonsterEntity extends MonsterEntityResponseDto {
  @Expose()
  @Type(() => Inventory)
  readonly inventory: Inventory;
}

class PlayableHeroEntity extends HeroEntityResponseDto {
  @Expose()
  @Type(() => Inventory)
  readonly inventory: Inventory;
}

@ApiExtraModels(PlayableHeroEntity, PlayableMonsterEntity)
export class GameResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({ enum: GameStatus, enumName: "GameStatus" })
  readonly status: GameStatusType;

  @Expose()
  @Type(() => Board)
  readonly board: Board;

  @Expose()
  @Type(() => GameMasterResponseDto)
  readonly gameMaster: GameMasterResponseDto;

  @Expose()
  @Type(() => PlayableEntityResponseDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "faction",
      subTypes: [
        { value: PlayableHeroEntity, name: PlayableEntityFaction.HERO },
        { value: PlayableMonsterEntity, name: PlayableEntityFaction.MONSTER },
      ],
    },
  })
  @ApiProperty({
    type: "array",
    items: {
      oneOf: [
        { $ref: getSchemaPath(PlayableHeroEntity) },
        { $ref: getSchemaPath(PlayableMonsterEntity) },
      ],
      discriminator: {
        propertyName: "type",
        mapping: {
          [PlayableEntityFaction.HERO]: "PlayableHeroEntity",
          [PlayableEntityFaction.MONSTER]: "PlayableMonsterEntity",
        },
      },
    },
  })
  readonly playableEntities: Array<PlayableHeroEntity | PlayableMonsterEntity>;

  @Expose()
  readonly timeline: Array<PlayableEntityResponseDto["id"]>;
}
