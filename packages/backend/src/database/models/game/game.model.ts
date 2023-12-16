import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from '../model.abstract';
import { Game } from './game.type';

@Injectable()
export class GameModel extends DatabaseModel<Game> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'game');
  }
}
