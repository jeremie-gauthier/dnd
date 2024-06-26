import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import type { EnvSchema } from "src/config/env.config";
import type { AuthToken } from "./auth-token.interface";

@Injectable()
export class JwtService {
  private readonly client: jwksClient.JwksClient;

  constructor(readonly configService: ConfigService<EnvSchema>) {
    const auth0Issuer = configService.getOrThrow<string>("AUTH0_ISSUER");

    this.client = jwksClient({
      jwksUri: `${auth0Issuer}.well-known/jwks.json`,
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
    });
  }

  public verify(token: string): Promise<AuthToken> {
    return new Promise((resolve, reject) =>
      jwt.verify(
        token,
        this.getKey.bind(this),
        (err: jwt.VerifyErrors, decodedToken: AuthToken) => {
          if (err) {
            reject(err);
          } else {
            resolve(decodedToken);
          }
        },
      ),
    );
  }

  private getKey(
    header: jwt.JwtHeader,
    callback: (err: Error | null, key?: string) => void,
  ) {
    return this.client.getSigningKey(header.kid, (err, key) => {
      callback(err, key?.getPublicKey());
    });
  }
}
