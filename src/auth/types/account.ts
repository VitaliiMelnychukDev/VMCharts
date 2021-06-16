import { IResponse } from '../../shared/types/response';
import { IUserData } from './auth';

export interface IAccountResponse extends IResponse {
  data: IUserData
}