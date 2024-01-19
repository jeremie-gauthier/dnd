import { Controller, Get, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/authz/jwt-auth.guard';
import { GetLobbiesUseCase } from './get-lobbies/get-lobbies.uc';

@UseGuards(JWTAuthGuard)
@Controller('lobby/private')
export class LobbyPrivateController {
  constructor(private readonly getLobbiesUseCase: GetLobbiesUseCase) {}

  @Get('get-lobbies')
  public async getLobbies() {
    return await this.getLobbiesUseCase.execute();
  }
}
