import { IsEnum, IsOptional } from 'class-validator';
import { RockGenre } from '../types/chart';
import { BaseSearchDto } from '../../shared/dtos/base-search.dto';

export class SearchChartsDto extends BaseSearchDto {
  @IsOptional()
  @IsEnum(RockGenre)
  genre?: RockGenre
}