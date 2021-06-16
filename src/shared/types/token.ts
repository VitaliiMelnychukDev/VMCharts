import { IUserData } from '../../auth/types/auth';

export interface IAccessTokenPayload extends IUserData {
  userId: string;
}

export interface IRefreshTokenPayload {
  userId: string;
}

export interface ICommonTokenData {
  iat: number;
  exp: number
}

export interface IAccessTokenBody extends IAccessTokenPayload, ICommonTokenData {}