import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  TileEntityType,
  TileEntityTypeType,
} from "src/database/enums/tile-entity-type.enum";

export abstract class TileEntityResponseDto {
  @Expose()
  @ApiProperty({ enum: TileEntityType, enumName: "TileEntityType" })
  abstract readonly type: TileEntityTypeType;

  @Expose()
  readonly isBlocking: boolean;
}
