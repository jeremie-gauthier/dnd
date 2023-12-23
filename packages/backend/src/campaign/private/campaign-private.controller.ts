import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { JWTUser, UserFromJWT } from 'src/auth/jwt-user.decorator';
import {
  NewCampaignStartedInputDto,
  NewCampaignStartedOutputDto,
} from './new-campaign-started/new-campaign-started.dto';
import { NewCampaignStartedUseCase } from './new-campaign-started/new-campaign-started.uc';

@Controller('campaign/private')
export class CampaignPrivateController {
  constructor(private readonly newCampaignStartedUseCase: NewCampaignStartedUseCase) {}

  @Post('start-new')
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(NewCampaignStartedOutputDto)
  public async userStartNewCampaign(
    @JWTUser() user: UserFromJWT,
    @Body() newCampaignStartedDto: NewCampaignStartedInputDto,
  ) {
    return await this.newCampaignStartedUseCase.execute({
      userId: user.id,
      campaignId: newCampaignStartedDto.campaignId,
    });
  }
}
