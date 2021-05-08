import { Role } from './role';

export interface IAccessTokenPayload {
  userId: string;
  roles?: Role[];
  email: string;
}