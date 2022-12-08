import { Org, User } from './db.interface';

export class UserAPIResponse {
  id: number;
  name: string;
  email: string;
  org: {
    id: number;
    name: string;
  };

  constructor(user: User, org: Org) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.org = {
      id: org.id,
      name: org.name,
    };
  }
}
