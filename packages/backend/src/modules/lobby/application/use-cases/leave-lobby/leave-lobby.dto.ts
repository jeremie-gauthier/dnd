import { Expose } from "class-transformer";

export class LeaveLobbyOutputDto {
  @Expose()
  readonly message: "OK";
}
