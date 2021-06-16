import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { SongDocument } from '../schemas/song.schema';
import { SongSchemaName } from '../types/schema/song';
import { BaseRepository } from '../../shared/repository/base.repository';
import { IMongoSearchResults } from '../../shared/types/repository';
import { ISongsSearchResults } from '../types/song';
import { BaseSearchDto } from '../../shared/dtos/base-search.dto';

@Injectable()
export class SongRepository extends BaseRepository<SongDocument>{
  private readonly nameField = 'name';

  private readonly authorField = 'author';

  constructor(
    @InjectModel(SongSchemaName) private songModel: Model<SongDocument>
  ) {
    super(songModel)
  }

  public async searchSongs(searchParamns: BaseSearchDto): Promise<ISongsSearchResults> {
    const filters: Record<string, any>  = {};
    if (searchParamns.searchTerm) {
      this.addOrToFilters(filters, [this.nameField, this.authorField], searchParamns.searchTerm);
    }
    const searchResults: IMongoSearchResults = await this.search(searchParamns, filters);

    return {
      songs: searchResults.items,
      totalCount: searchResults.totalCount
    }
  }
}