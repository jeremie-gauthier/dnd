import { DatabaseService } from './database.service';

export abstract class DatabaseModel {
  constructor(protected readonly dbService: DatabaseService) {}

  public abstract readonly TABLE_NAME: string;

  protected get table() {
    return this.dbService.db.table(this.TABLE_NAME);
  }

  public async registerTable() {
    try {
      await this.dbService.exec(this.dbService.db.tableCreate(this.TABLE_NAME));
      console.log(this.TABLE_NAME, 'created');
    } catch (error) {
      console.log(this.TABLE_NAME, 'already exists');
    }
  }
}
