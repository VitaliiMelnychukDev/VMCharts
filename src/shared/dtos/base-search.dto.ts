import { BasePaginationDto } from '../../shared/dtos/base-pagination.dto';
import { IsOptional } from 'class-validator';

export class BaseSearchDto extends BasePaginationDto {
  @IsOptional()
  searchTerm?: string;
}