import { Inject, Injectable } from '@nestjs/common';
import { Connection, RQuery, r } from 'rethinkdb-ts';

@Injectable()
export class DatabaseService {
  private readonly connection: Connection;
  private static DATABASE_NAME = 'dnd';
  private static DATABASE_TABLES = ['user', 'campaign'] as const;

  constructor(@Inject('DatabaseProvider') connection: Connection) {
    this.connection = connection;
  }

  get db() {
    return r;
  }

  public async exec<T>(query: RQuery<T>) {
    return await query.run(this.connection);
  }

  public async init() {
    try {
      await r.dbCreate(DatabaseService.DATABASE_NAME).run(this.connection);
      console.log(DatabaseService.DATABASE_NAME, 'db created');
    } catch (error) {
      console.log(DatabaseService.DATABASE_NAME, 'db already exists');
    }

    this.connection.use(DatabaseService.DATABASE_NAME);

    await Promise.all(
      DatabaseService.DATABASE_TABLES.map(async (dbTable) => {
        try {
          await r.tableCreate(dbTable).run(this.connection);
          console.log(dbTable, 'created');
        } catch (error) {
          console.log(dbTable, 'already exists');
        }
      }),
    );
  }
}