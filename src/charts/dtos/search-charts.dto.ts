import { IsEnum, IsOptional } from 'class-validator';
import { RockGenre } from '../types/chart';
import { BaseSearchDto } from '../../shared/dtos/base-search.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SearchChartsDto extends BaseSearchDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(RockGenre)
  genre?: RockGenre
}