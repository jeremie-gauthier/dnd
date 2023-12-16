import { RQuery, RTable } from 'rethinkdb-ts';
import { DatabaseService } from '../database.service';

export abstract class DatabaseModel<Model> {
  public readonly table: RTable<Partial<Model>>;

  constructor(
    protected readonly dbService: DatabaseService,
    protected readonly tableName: string,
  ) {
    this.table = dbService.db.table(tableName);
  }

  public async exec<T>(query: RQuery<T>) {
    return await this.dbService.exec(query);
  }

  public async registerTable() {
    try {
      await this.dbService.exec(this.dbService.db.tableCreate(this.tableName));
      console.log(this.tableName, 'created');
    } catch (error) {
      console.log(this.tableName, 'already exists');
    }
  }
}
