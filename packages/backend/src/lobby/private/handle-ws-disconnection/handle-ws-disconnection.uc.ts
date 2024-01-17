import { Injectable } from '@nestjs/common';
import { ServerSocket } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { HandleWsDisconnectionRepository } from './handle-ws-disconnection.repository';

@Injectable()
export class HandleWsDisconnectionUseCase implements UseCase {
  constructor(private readonly repository: HandleWsDisconnectionRepository) {}

  public async execute(client: ServerSocket): Promise<void> {
    await Promise.all([this.leaveRooms(client), this.repository.forgetUser(client.data.userId)]);
  }

  private async leaveRooms(client: ServerSocket) {
    return await Promise.all(Array.from(client.rooms).map((room) => client.leave(room)));
  }
}
