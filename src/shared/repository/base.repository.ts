import { Model, Document } from 'mongoose';
import { PaginationService } from '../services/pagination.service';
import { Inject } from '@nestjs/common';
import { IPagination } from '../types/pagination';
import { BasePaginationDto } from '../dtos/base-pagination.dto';
import { IMatchOr, IMatchOrPart, IMatchRegex, IMongoSearch, IMongoSearchResults } from '../types/repository';

export abstract class BaseRepository<T extends Document> {
  @Inject() private paginationService: PaginationService;

  constructor(protected model: Model<T>) {}

  protected async search(searchParamns: BasePaginationDto, filters: Record<string, any>  = {}): Promise<IMongoSearchResults> {
    const paginationParams: IPagination = this.paginationService.getPaginationParams(searchParamns);

    const or = {$or: [{'author': {$regex: '.*spi.*', $options: 'i'}, 'name': {$regex: '.*spi.*', $options: 'i'}}]};

    const charts: IMongoSearch[] = await this.model.aggregate<IMongoSearch>([
      {
        '$facet': {
          'items': [
            { '$match': filters},
            { '$skip': paginationParams.skip },
            { '$limit': paginationParams.limit }
          ],
          'totalCount': [
            { '$match': filters },
            { '$count': 'count' }
          ]
        }
      }
    ]);

    return this.mapSearchResults(charts);
  }

  protected createMatchRegex(value: string): IMatchRegex {
    return {
      $regex: `.*${value}.*`,
      $options: 'i'
    }
  }

  protected addOrToFilters(filters: Record<string,any>, fields: string[], value: string): void {
    const matchOrParts: IMatchOrPart[] = fields.map((field: string) => {
      return {
        [field]: this.createMatchRegex(value)
      }
    });

    filters['$or'] = matchOrParts
  }

  private mapSearchResults(mongoSearchResults: IMongoSearch[]): IMongoSearchResults {
    const mongoSearchResponse: IMongoSearchResults = {
      items:  mongoSearchResults[0].items,
      totalCount: 0
    };

    if (mongoSearchResults[0].totalCount.length) {
      mongoSearchResponse.totalCount = mongoSearchResults[0].totalCount[0].count
    }

    return mongoSearchResponse;
  }
}