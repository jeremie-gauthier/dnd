import { Expose } from "class-transformer";
import { ItemType } from "src/database/enums/item-type.enum";

export class ArtifactResponseDto {
  @Expose()
  readonly type = ItemType.ARTIFACT;

  @Expose()
  readonly hasSavingThrow: boolean;
}
