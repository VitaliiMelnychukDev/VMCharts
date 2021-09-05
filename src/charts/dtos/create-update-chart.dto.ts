import { RockGenre } from '../types/chart';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class BaseChartDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(RockGenre)
  genre?: RockGenre

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ChartSong)
  songs?: ChartSong[]
}

export class ChartSong {
  @ApiProperty()
  @IsNumber()
  position: number;

  @ApiProperty()
  @IsString()
  song: string
}

export class CreateChartDto extends BaseChartDto {
  @ApiProperty()
  @IsString()
  slug: string;

  @IsString()
  name: string;
}

export class UpdateChartDto extends BaseChartDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;
}