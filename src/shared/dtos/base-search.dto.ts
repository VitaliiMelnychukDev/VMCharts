import { BasePaginationDto } from '../../shared/dtos/base-pagination.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseSearchDto extends BasePaginationDto {
  @ApiProperty()
  @IsOptional()
  searchTerm?: string;
}