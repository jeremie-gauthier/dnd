import { Body, Controller, Post } from '@nestjs/common';
import { CreateArtifactInputDTO } from './dto/create-artifact.input.dto';
import { CreateSpellInputDTO } from './dto/create-spell.input.dto';
import { CreateWeaponInputDTO } from './dto/create-weapon.input.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/weapon')
  public async createWeapon(@Body() item: CreateWeaponInputDTO) {
    return await this.itemService.create(item);
  }

  @Post('/spell')
  public async createSpell(@Body() item: CreateSpellInputDTO) {
    return await this.itemService.create(item);
  }

  @Post('/artifact')
  public async createArtifact(@Body() item: CreateArtifactInputDTO) {
    return await this.itemService.create(item);
  }
}
