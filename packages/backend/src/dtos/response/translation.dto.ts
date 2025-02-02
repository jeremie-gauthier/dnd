import { Expose } from "class-transformer";

export class TranslationResponseDto {
  @Expose()
  readonly locale: string;

  @Expose()
  readonly namespace: string;

  @Expose()
  readonly translations: Record<string, string>;
}
