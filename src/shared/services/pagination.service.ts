import { ConfigService } from '@nestjs/config';
import { BasePaginationDto } from '../dtos/base-pagination.dto';
import { IPagination } from '../types/pagination';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  private  maxCountPerPage: number;

  constructor(private configService: ConfigService) {
    this.maxCountPerPage = this.configService.get<number>('PAGINATION_MAX_COUNT_PER_PAGE');
  }

  getPaginationParams(basePaginationDto: BasePaginationDto): IPagination {
    //TODO Need to investigate why data is a string
    let limit = Number(basePaginationDto.limit) || this.maxCountPerPage;
    if (limit > this.maxCountPerPage) {
      limit = this.maxCountPerPage;
    }

    const skip: number = basePaginationDto.page ? (basePaginationDto.page - 1) * limit : 0;

    return {
      limit: limit,
      skip
    }
  }
}