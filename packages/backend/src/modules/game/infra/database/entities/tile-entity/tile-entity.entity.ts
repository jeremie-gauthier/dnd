import { ApiProperty } from "@nestjs/swagger";
import {
  TileEntityType,
  TileEntityTypeType,
} from "src/database/enums/tile-entity-type.enum";

export abstract class TileEntity {
  @ApiProperty({ enum: TileEntityType, enumName: "TileEntityType" })
  abstract readonly type: TileEntityTypeType;
  abstract isBlocking: boolean;
}
