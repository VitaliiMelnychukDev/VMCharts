import { IResponse } from '../../shared/types/response';
import { Chart } from '../schemas/chart.schema';

export enum RockGenre {
  Metal = 'metal',
  Punk = 'punk',
  Grunge = 'grunge',
  Alternative = 'alternative',
  General = 'general'
}

export interface IChartResponse extends IResponse {
  data: Chart;
}

export interface ISearchChartsResponse extends IResponse {
  data: IChartsSearchResults;
}

export interface IChartsSearchResults {
  charts: Chart[],
  totalCount: number
}