import { r } from 'rethinkdb-ts';

export const DatabaseProvider = {
  provide: 'DatabaseProvider',
  useFactory: async () => {
    const conn = await r.connect({
      host: 'localhost',
      port: 28015,
    });
    return conn;
  },
};
