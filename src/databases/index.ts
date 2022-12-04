import Knex from 'knex';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';

const dbConnection = {
  client: 'pg',
  connection: "postgresql://postgres:226688@localhost:5432/postgres",
  pool: {
    min: 2,
    max: 10,
  },
};

export default Knex(dbConnection);


