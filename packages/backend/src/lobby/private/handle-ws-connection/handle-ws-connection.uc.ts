import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { JwtService } from "src/authz/jwt.service";
import type { ServerSocket } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";

@Injectable()
export class HandleWsConnectionUseCase implements UseCase {
  constructor(private readonly jwtService: JwtService) {}

  public async execute(client: ServerSocket): Promise<void> {
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
