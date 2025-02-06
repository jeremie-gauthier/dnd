import { GetUserOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import { User } from "../../infra/database/entities/user.entity";
import { GetUserRepository } from "./get-user.repository";

@Injectable()
export class GetUserUseCase implements UseCase {
  constructor(private readonly repository: GetUserRepository) {}

  public async execute({
    userId,
  }: { userId: User["id"] }): Promise<GetUserOutput> {
    const user = await this.repository.getUserById(userId);
    return user;
  }
}
