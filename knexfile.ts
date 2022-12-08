import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './src/config';

const dbConfig =  {
  client: 'pg',
  connection: "postgresql://postgres:226688@localhost:5432/postgres",
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
