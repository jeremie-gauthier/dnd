import { Inject, Injectable } from '@nestjs/common';
import { Connection, RQuery, r } from 'rethinkdb-ts';
import { DatabaseModel } from './models/model.abstract';

@Injectable()
export class DatabaseService {
  private static DATABASE_NAME = 'dnd';

  constructor(@Inject('DatabaseProvider') private readonly connection: Connection) {}

  get db() {
    return r;
  }

  public async exec<T>(query: RQuery<T>) {
    return await query.run(this.connection);
  }

  public async init(dbModels: DatabaseModel<unknown>[]) {
    await this.createDbIfNotExists();
    this.connection.use(DatabaseService.DATABASE_NAME);
    await this.createTablesIfNotExists(dbModels);
  }

  private async createDbIfNotExists() {
    try {
      await r.dbCreate(DatabaseService.DATABASE_NAME).run(this.connection);
      console.log(DatabaseService.DATABASE_NAME, 'db created');
    } catch (error) {
      console.log(DatabaseService.DATABASE_NAME, 'db already exists');
    }
  }

  private async createTablesIfNotExists(dbModels: DatabaseModel<unknown>[]) {
    await Promise.all(dbModels.map((dbModel) => dbModel.registerTable()));
  }
}
