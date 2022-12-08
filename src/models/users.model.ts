import { Model, ModelObject } from 'objection';
import { User } from '@/interfaces/db.interface';

export class Users extends Model implements User {
  id!: number;
  name!: string;
  org_id!: number;
  email!: string;
  password!: string;
  type?: string;

  static tableName = 'users'; // database table name
  static idColumn = 'id'; // id column name
}

export type UsersShape = ModelObject<Users>;
