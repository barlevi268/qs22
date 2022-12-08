import { Org, User } from './db.interface';
import { TokenData } from './auth.interface';

export class UserAPIResponse {
  id: number;
  name: string;
  email: string;
  org: Org;

  constructor(user: User, org: Org) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.org = org;
  }
}

export class UserAPILogin {
  id: number;
  name: string;
  email: string;
  org: Org;
  token: TokenData;

  constructor(user: User, org: Org, token: TokenData) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.org = org;
    this.token = token;
  }
}
