import { RockGenre } from '../types/chart';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BaseChartDto {
  @IsOptional()
  @IsEnum(RockGenre)
  genre?: RockGenre

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Song)
  songs?: Song[]
}

class Song {
  @IsNumber()
  position: number;

  @IsString()
  song: string
}

export class CreateChartDto extends BaseChartDto {
  @IsString()
  name: string;
}

export class UpdateChartDto extends BaseChartDto {
  @IsString()
  @IsOptional()
  name?: string;
}