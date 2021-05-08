import { Role } from './role';

export interface IRefreshToken {
  userId: string;
}

export interface IAccessToken {
  userId: string;
  roles?: Role[];
  email: string;
}