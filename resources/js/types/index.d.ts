export interface IPaginatedMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;

  links: {
    url: null | string;
    label: string;
    active: boolean;
  }[];
}

export interface IPaginatedData<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };

  meta: IPaginatedMeta;
}


/**
 * Reference RoleEnum.php
 */
type UserRole = "ADMIN" | "VENDOR" | null;


/**
 * Reference UserResource.php
 */
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole
    approved_at?: string;
}

/**
 * Reference ProductResource.php
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  user_id: number
  
  relation: {
    user?: User
  }
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
      status: "success" | "error";
      message: string;
    } | null;
  
};
