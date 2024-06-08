import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { ZodSerializerDto } from "nestjs-zod";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { GetCampaignsUseCase } from "../../use-cases/get-campaigns/get-campaigns.uc";
import {
  NewCampaignStartedOutputDto,
  type NewCampaignStartedInputDto,
} from "../../use-cases/new-campaign-started/new-campaign-started.dto";
import { NewCampaignStartedUseCase } from "../../use-cases/new-campaign-started/new-campaign-started.uc";

@UseGuards(AuthGuard)
@Controller("campaign/private")
export class CampaignPrivateController {
  constructor(
    private readonly newCampaignStartedUseCase: NewCampaignStartedUseCase,
    private readonly getCampaignsUseCase: GetCampaignsUseCase,
  ) {}

  @Post("new-campaign-started")
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(NewCampaignStartedOutputDto)
  public async newCampaignStarted(
    @AuthUser() user: Request["user"],
    @Body() newCampaignStartedDto: NewCampaignStartedInputDto,
  ) {
    return await this.newCampaignStartedUseCase.execute({
      userId: user.id,
      campaignId: newCampaignStartedDto.campaignId,
    });
  }

  @Get("get-campaigns")
  public async getCampaigns(@AuthUser() user: Request["user"]) {
    return await this.getCampaignsUseCase.execute({ userId: user.id });
  }
}
