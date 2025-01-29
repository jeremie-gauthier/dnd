import { StorageSpace, StorageSpaceType } from "@dnd/shared";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class StuffResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({ enum: StorageSpace, enumName: "StorageSpace" })
  readonly storageSpace: StorageSpaceType;
}
