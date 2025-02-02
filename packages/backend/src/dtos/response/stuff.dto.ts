import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  StorageSpace,
  StorageSpaceType,
} from "src/database/enums/storage-space.enum";

export class StuffResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({ enum: StorageSpace, enumName: "StorageSpace" })
  readonly storageSpace: StorageSpaceType;
}
