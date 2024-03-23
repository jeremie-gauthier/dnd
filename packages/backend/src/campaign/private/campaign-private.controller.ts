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
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import { JWTUser } from "src/authz/jwt-user.decorator";
import { GetCampaignsUseCase } from "./get-campaigns/get-campaigns.uc";
import {
  NewCampaignStartedOutputDto,
  type NewCampaignStartedInputDto,
} from "./new-campaign-started/new-campaign-started.dto";
import { NewCampaignStartedUseCase } from "./new-campaign-started/new-campaign-started.uc";

@UseGuards(JWTAuthGuard)
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
    @JWTUser() user: Request["user"],
    @Body() newCampaignStartedDto: NewCampaignStartedInputDto,
  ) {
    return await this.newCampaignStartedUseCase.execute({
      userId: user.id,
      campaignId: newCampaignStartedDto.campaignId,
    });
  }

  @Get("get-campaigns")
  public async getCampaigns(@JWTUser() user: Request["user"]) {
    return await this.getCampaignsUseCase.execute({ userId: user.id });
  }
}
