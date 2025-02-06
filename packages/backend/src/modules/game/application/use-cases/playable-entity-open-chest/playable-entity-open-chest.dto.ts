import { Type } from "class-transformer";
import { IsInt, IsPositive, IsUUID } from "class-validator";
import { ArtifactResponseDto } from "../../dtos/response/artifact.dto";
import { ChestTrapResponseDto } from "../../dtos/response/chest-trap.dto";
import { PotionResponseDto } from "../../dtos/response/potion.dto";
import { SpellResponseDto } from "../../dtos/response/spell.dto";
import { WeaponResponseDto } from "../../dtos/response/weapon.dto";

class CoordDto {
  @IsInt()
  @IsPositive()
  readonly row: number;

  @IsInt()
  @IsPositive()
  readonly column: number;
}

export class PlayableEntityOpenChestInputDto {
  @IsUUID()
  readonly gameId: string;

  @Type(() => CoordDto)
  readonly coordOfTileWithChest: CoordDto;
}

export class PlayableEntityOpenChestOutputDto {
  readonly itemFound:
    | WeaponResponseDto
    | SpellResponseDto
    | ArtifactResponseDto
    | ChestTrapResponseDto
    | PotionResponseDto;
}
