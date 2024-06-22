import { ServerLobbyEvent } from "@dnd/shared";
import { type ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import type { Socket } from "socket.io";

@Catch(WsException, HttpException)
export class WsExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    this.sendErrorMsg(client, exception);
  }

  private sendErrorMsg(client: Socket, exception: HttpException | WsException) {
    console.error(exception);
    client.emit(ServerLobbyEvent.Error, {
      name: exception.name,
      message: exception.message,
    });
  }
}
