import { Injectable } from "@nestjs/common";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";

@Injectable()
export class GetLobbiesRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public async getLobbies() {
    return await this.lobbiesRepository.getMany();
  }
}
