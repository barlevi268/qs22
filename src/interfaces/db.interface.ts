export interface User {
  id: number;
  name: string;
  org_id: number;
  email: string;
  password: string;
  type?: string;
}

export interface Org {
  id: number;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  org_id: number;
}

export interface Slug {
  id: number;
  slug: string;
  url: string;
  org_id: number;
  collection_id: number;
}
