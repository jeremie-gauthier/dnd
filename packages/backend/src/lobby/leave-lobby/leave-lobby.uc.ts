import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { MessageContext } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";

@Injectable()
export class LeaveLobbyUseCase implements UseCase {
  constructor(private readonly seatManagerService: SeatManagerService) {}

  public async execute({
    ctx,
    userId,
  }: {
    ctx: MessageContext;
    userId: User["id"];
  }): Promise<void> {
    await this.seatManagerService.leave({ ctx, userId });
  }
}
