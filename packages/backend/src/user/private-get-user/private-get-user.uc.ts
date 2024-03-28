import { PrivateGetUserOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/types/use-case.interface";
import { PrivateGetUserRepository } from "./private-get-user.repository";

@Injectable()
export class PrivateGetUserUseCase implements UseCase {
  constructor(private readonly repository: PrivateGetUserRepository) {}

  public async execute({
    userId,
  }: { userId: User["id"] }): Promise<PrivateGetUserOutput> {
    const user = await this.repository.getUserById(userId);
    return user;
  }
}
