import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import {
  StorageSpace,
  StorageSpaceType,
} from "src/modules/game/infra/database/enums/storage-space.enum";

export class PlayableEntityLootItemInputDto {
  @IsUUID()
  readonly gameId: string;

  @IsString()
  @IsNotEmpty()
  readonly itemId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly replacedItemId?: string;

  @IsEnum(StorageSpace)
  readonly storageSpace: StorageSpaceType;
}
