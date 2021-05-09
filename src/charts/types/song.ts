import { IResponse } from '../../shared/types/response';
import { Song } from '../schemas/song.schema';

export interface ISongResponse extends IResponse {
  data: Song;
}