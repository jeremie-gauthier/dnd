import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "../../infra/database/lobbies.repository";

@Injectable()
export class GetLobbiesRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public async getLobbies() {
    return await this.lobbiesRepository.getMany();
  }
}
