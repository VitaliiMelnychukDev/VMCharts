import { IAccessTokenPayload } from './token';

export interface IRequest extends Request {
  user?: IAccessTokenPayload;
}