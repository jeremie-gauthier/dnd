import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  EntityType,
  EntityTypeType,
} from "src/modules/game/infra/database/enums/tile-entity-type.enum";

export abstract class TileEntityResponseDto {
  @Expose()
  @ApiProperty({ enum: EntityType, enumName: "TileEntityType" })
  abstract readonly type: EntityTypeType;

  @Expose()
  readonly isBlocking: boolean;
}
