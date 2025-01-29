import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ItemType } from "src/database/enums/item-type.enum";
import { ItemResponseDto } from "./item.dto";

export class ArtifactResponseDto extends ItemResponseDto {
  @Expose()
  @ApiProperty({ enum: [ItemType.ARTIFACT], enumName: "ItemType_Artifact" })
  override readonly type = ItemType.ARTIFACT;

  @Expose()
  readonly hasSavingThrow: boolean;
}
