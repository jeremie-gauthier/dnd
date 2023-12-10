import { Injectable } from '@nestjs/common';
import { EntityTemplateModel } from './model/entity-template.model';

@Injectable()
export class EntityService {
  constructor(private readonly entityModel: EntityTemplateModel) {}
}
