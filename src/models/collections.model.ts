import { Model, ModelObject } from 'objection';
import { Collection } from '@/interfaces/db.interface';

export class Collections extends Model implements Collection {
  id!: number;
  name!: string;
  org_id!: number;

  static tableName = 'Collections'; // database table name
  static idColumn = 'id'; // id column name
}

export type CollectionsShape = ModelObject<Collections>;
