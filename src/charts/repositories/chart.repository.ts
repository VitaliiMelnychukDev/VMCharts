import { InjectModel } from '@nestjs/mongoose';
import { ChartSchemaName } from '../types/schema/chart';
import { Model } from 'mongoose';
import { ChartDocument } from '../schemas/chart.schema';
import { SearchChartsDto } from '../dtos/search-charts.dto';
import { Injectable } from '@nestjs/common';
import { IChartsSearchResults } from '../types/chart';
import { BaseRepository } from '../../shared/repository/base.repository';
import { IMongoSearchResults } from '../../shared/types/repository';

@Injectable()
export class ChartRepository extends BaseRepository<ChartDocument> {
  public readonly songsPopulateStrting = 'songs.song';

  private readonly genreField = 'genre';

  private readonly nameField = 'name';

  private readonly descriptionField = 'description';

  constructor(
    @InjectModel(ChartSchemaName) private chartModel: Model<ChartDocument>
  ) {
    super(chartModel);
  }

  public async searchCharts(searchParamns: SearchChartsDto): Promise<IChartsSearchResults> {
    const filters: Record<string, any>  = {};
    if (searchParamns.genre) {
      filters[this.genreField] = searchParamns.genre;
    }
    if (searchParamns.searchTerm) {
      this.addOrToFilters(filters, [this.nameField, this.descriptionField], searchParamns.searchTerm);
    }

    const searchResults: IMongoSearchResults = await this.search(searchParamns, filters);

    return {
      charts: searchResults.items,
      totalCount: searchResults.totalCount
    }
  }
}