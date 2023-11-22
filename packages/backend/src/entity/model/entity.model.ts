import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';
import { CreateCharacterEntityInputDTO } from '../dto/create-character-entity.input.dto';
import { CreateEnemyEntityInputDTO } from '../dto/create-enemy-entity.input.dto';
import { CreateInteractiveEntityInputDTO } from '../dto/create-interactive-entity.input.dto';
import { CreateNonInteractiveEntityInputDTO } from '../dto/create-non-interactive-entity.input.dto';

type CreateEntityInputDto =
  | CreateEnemyEntityInputDTO
  | CreateCharacterEntityInputDTO
  | CreateNonInteractiveEntityInputDTO
  | CreateInteractiveEntityInputDTO;

@Injectable()
export class EntityModel extends DatabaseModel {
  public readonly TABLE_NAME = 'entity';

  constructor(dbService: DatabaseService) {
    super(dbService);
  }

  public async create<EntityDto extends CreateEntityInputDto>(entity: EntityDto) {
    return await this.dbService.exec(this.table.insert(entity));
  }

  public async getAll() {
    return await this.dbService.exec(this.table);
  }
}
