import { Request } from 'express';
import { Slug } from '@/interfaces/db.interface';

export interface DataStoredInToken {
  id: number;
  org_id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: {
    id: number;
    org_id: number;
  };
}

export interface UserWithSlugs {
  id: number;
  org_id: number;
  slugs: Slug[];
}

export interface RequestWithUserAndSlugs extends Request {
  user: UserWithSlugs;
}
