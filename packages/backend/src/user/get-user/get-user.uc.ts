import { GetUserOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/types/use-case.interface";
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
