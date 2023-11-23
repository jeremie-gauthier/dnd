import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';
import { CreateArtifactInputDTO } from '../dto/create-artifact.input.dto';
import { CreateSpellInputDTO } from '../dto/create-spell.input.dto';
import { CreateWeaponInputDTO } from '../dto/create-weapon.input.dto';
import { Item } from '../types/item.type';

@Injectable()
export class ItemModel extends DatabaseModel<Item> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'item');
  }

  public async create(item: CreateWeaponInputDTO | CreateSpellInputDTO | CreateArtifactInputDTO) {
    return await this.dbService.exec(this.table.insert(item));
  }
}
