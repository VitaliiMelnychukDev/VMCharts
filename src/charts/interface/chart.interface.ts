import { RockGenre } from '../types/chart';

export interface Chart {
  id: number;
  name: string;
  genre?: RockGenre
}