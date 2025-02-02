import { Type } from "class-transformer";
import { IsInt, IsPositive, IsUUID } from "class-validator";
import { Item } from "src/modules/game/infra/database/entities/item/item.entity";

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
  readonly itemFound: Item;
}
