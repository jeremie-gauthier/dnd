import { TileEntityTypeType } from "src/database/enums/tile-entity-type.enum";

export abstract class TileEntity {
  abstract readonly type: TileEntityTypeType;
  abstract isBlocking: boolean;
}
