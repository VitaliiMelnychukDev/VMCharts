import { IResponse } from '../../shared/types/response';
import { Chart } from '../schemas/chart.schema';

export enum RockGenre {
  Metal = 'metal',
  Punk = 'punk',
  Grunge = 'grunge',
  Alternative = 'alternative',
  Pop = 'pop'
}

export interface IChartResponse extends IResponse {
  data: Chart;
}

export interface IGetAllChartsResponse extends IResponse {
  data: Chart[];
}