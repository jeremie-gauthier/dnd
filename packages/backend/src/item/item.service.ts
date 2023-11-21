import { Injectable } from '@nestjs/common';
import { CreateArtifactInputDTO } from './dto/create-artifact.input.dto';
import { CreateSpellInputDTO } from './dto/create-spell.input.dto';
import { CreateWeaponInputDTO } from './dto/create-weapon.input.dto';
import { ItemModel } from './model/item.model';

@Injectable()
export class ItemService {
  constructor(private readonly itemModel: ItemModel) {}

  public async create(item: CreateWeaponInputDTO | CreateSpellInputDTO | CreateArtifactInputDTO) {
    const dbResult = await this.itemModel.create(item);
    return dbResult;
  }
}
