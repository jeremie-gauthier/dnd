import { Body, Controller, Post } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { CampaignService } from './campaign.service';
import { CreateCampaignInputDTO } from './dto/create-campaign.input.dto';
import { CreateCampaignOutputDTO } from './dto/create-campaign.output.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ZodSerializerDto(CreateCampaignOutputDTO)
  public async create(@Body() campaign: CreateCampaignInputDTO) {
    console.log(campaign);
    return '';
  }
}
