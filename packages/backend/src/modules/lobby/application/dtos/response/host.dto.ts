import { Expose } from "class-transformer";

export class HostResponseDto {
  @Expose()
  readonly userId: string;
}
