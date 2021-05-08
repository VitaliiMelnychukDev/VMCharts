import { RockGenre } from '../types/chart';
import { IsOptional, IsString } from 'class-validator';

export class CreateChartDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  genre?: RockGenre
}