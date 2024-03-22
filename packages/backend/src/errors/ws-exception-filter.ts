import { ServerLobbyEvent } from "@dnd/shared";
import { type ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import type { Socket } from "socket.io";

@Catch(WsException, HttpException)
export class WsExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    this.handleError(client, exception);
  }

  public handleError(client: Socket, exception: HttpException | WsException) {
    client.emit(ServerLobbyEvent.Error, {
      name: exception.name,
      message: exception.message,
    });
  }
}
