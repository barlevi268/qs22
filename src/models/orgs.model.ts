import { Model, ModelObject } from 'objection';
import { Org } from '@/interfaces/db.interface';

export class Orgs extends Model implements Org {
  id!: number;
  name!: string;

  static tableName = 'Orgs'; // database table name
  static idColumn = 'id'; // id column name
}

export type OrgsShape = ModelObject<Orgs>;
