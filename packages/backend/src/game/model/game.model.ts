import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';
import { Game } from '../types/game.type';

@Injectable()
export class GameModel extends DatabaseModel<Game> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'game');
  }

  public async create(game: Game) {
    return await this.dbService.exec(this.table.insert(game));
  }
}
