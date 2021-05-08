import { IResponse } from '../../shared/types/response';
import { Role } from '../../shared/types/role';

export interface ILoginData {
  accessToken: string,
  refreshToken: string
}

export interface ILoginResponse extends IResponse {
  data: ILoginData;
}

export interface IAccessToken {
  email: string;
  id: string;
  roles: Role[]
}

export interface IRefreshTokenPayload {
  id: string;
}