import { IResponse } from '../../shared/types/response';
import { Role } from '../../shared/types/role';

export interface ITokenData {
  accessToken: string;
  refreshToken: string;
}

export interface IUserData {
  email: string;
  roles: Role[];
  name: string;
}

export interface ILoginData extends ITokenData {
  user: IUserData;
}

export interface ILoginResponse extends IResponse {
  data: ILoginData;
}

export interface IRefreshTokenResponse extends IResponse {
  data: ITokenData;
}

export interface IAccessToken {
  email: string;
  id: string;
  roles: Role[]
}