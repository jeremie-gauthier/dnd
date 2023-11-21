import { DatabaseService } from './database.service';

export abstract class DatabaseModel {
  constructor(protected readonly dbService: DatabaseService) {}

  public abstract registerTable(): Promise<void>;

  protected async _registerTable(tableName: string) {
    try {
      await this.dbService.exec(this.dbService.db.tableCreate(tableName));
      console.log(tableName, 'created');
    } catch (error) {
      console.log(tableName, 'already exists');
    }
  }
}
