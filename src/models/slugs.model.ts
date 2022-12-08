import { Model, ModelObject } from 'objection';
import { Slug } from '@/interfaces/db.interface';

export class Slugs extends Model implements Slug {
  id!: number;
  slug!: string;
  url!: string;
  org_id!: number;
  collection_id!: number;

  static tableName = 'Slugs'; // database table name
  static idColumn = 'id'; // id column name
}

export type SlugsShape = ModelObject<Slugs>;
