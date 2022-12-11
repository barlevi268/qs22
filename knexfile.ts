import { PG_CONNECTION_STRING } from './src/config';

const dbConfig =  {
  client: 'pg',
  connection: PG_CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: 'src/databases/migrations',
    tableName: 'migrations',
    // stub: 'src/databases/stubs',
  },
  seeds: {
    directory: 'src/databases/seeds',
    // stub: 'src/databases/stubs',
  },
};

export default dbConfig;
