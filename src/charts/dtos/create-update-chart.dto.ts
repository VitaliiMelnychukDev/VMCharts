import { RockGenre } from '../types/chart';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BaseChartDto {
  @IsOptional()
  @IsEnum(RockGenre)
  genre?: RockGenre

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ChartSong)
  songs?: ChartSong[]
}

export class ChartSong {
  @IsNumber()
  position: number;

  @IsString()
  song: string
}

export class CreateChartDto extends BaseChartDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;
}

export class UpdateChartDto extends BaseChartDto {
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  name?: string;
}