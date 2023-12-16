import { Injectable } from '@nestjs/common';
import { EntityTemplateModel } from 'src/database/models/entity-template/entity-template.model';

@Injectable()
export class EntityService {
  constructor(private readonly entityModel: EntityTemplateModel) {}
}
