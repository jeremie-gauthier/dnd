import { Injectable } from '@nestjs/common';
import { EntityService } from 'src/entity/entity.service';

@Injectable()
export class GameService {
  constructor(private readonly entityService: EntityService) {}

  // on game start, create a game document from the following data:
  // clone from stage_template:
  //   map AND objective
  // clone characters in this campaign_played
}
