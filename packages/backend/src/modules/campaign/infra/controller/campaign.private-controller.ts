import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Request } from "express";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { Serialize } from "src/middlewares/serialize.interceptor";
import { GetCampaignOutputDto } from "../../use-cases/get-campaigns/get-campaigns.dto";
import { GetCampaignsUseCase } from "../../use-cases/get-campaigns/get-campaigns.uc";
import {
  NewCampaignStartedInputDto,
  NewCampaignStartedOutputDto,
} from "../../use-cases/new-campaign-started/new-campaign-started.dto";
import { NewCampaignStartedUseCase } from "../../use-cases/new-campaign-started/new-campaign-started.uc";

@UseGuards(AuthGuard)
@Controller("campaign/private")
@ApiTags("Campaign")
export class CampaignPrivateController {
  constructor(
    private readonly newCampaignStartedUseCase: NewCampaignStartedUseCase,
    private readonly getCampaignsUseCase: GetCampaignsUseCase,
  ) {}

  @Post("new-campaign-started")
  @Serialize(NewCampaignStartedOutputDto)
  public async newCampaignStarted(
    @AuthUser() user: Request["user"],
    @Body() newCampaignStartedDto: NewCampaignStartedInputDto,
  ): Promise<NewCampaignStartedOutputDto> {
    return this.newCampaignStartedUseCase.execute({
      userId: user.id,
      campaignId: newCampaignStartedDto.campaignId,
    });
  }

  @Get("get-campaigns")
  @Serialize(GetCampaignOutputDto)
  public async getCampaigns(
    @AuthUser() user: Request["user"],
  ): Promise<Array<GetCampaignOutputDto>> {
    return await this.getCampaignsUseCase.execute({ userId: user.id });
  }
}
