import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import type { ServerSocket } from "src/interfaces/socket.type";
import type { UseCase } from "src/interfaces/use-case.interface";
import { JwtService } from "src/modules/authz/services/jwt/jwt.service";

@Injectable()
export class HandleWsConnectionUseCase implements UseCase {
  constructor(private readonly jwtService: JwtService) {}

  public async execute({ client }: { client: ServerSocket }): Promise<void> {
    const token: string | undefined = client.handshake.auth.token;
    if (token === undefined || token === null) {
      client.disconnect(true);
      throw new WsException("No token found during handshake");
    }

    try {
      const decodedToken = await this.jwtService.verify(token);
      if (!decodedToken.sub) {
        throw new WsException("No userId (sub) found in token");
      }

      client.data = {
        userId: decodedToken.sub,
      };

      client.join(client.data.userId);
    } catch (error) {
      client.disconnect(true);
      if (error instanceof Error) {
        throw new WsException(error.message);
      } else {
        throw new WsException(
          "An unknown error happened while verifying the token",
        );
      }
    }

    console.log(`New ws connection (${client.id})`);
  }
}
