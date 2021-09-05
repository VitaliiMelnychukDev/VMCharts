import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { SongPath } from '../types/paths/song';
import { CreateSongDto } from '../dtos/create-song.dto';
import { SongService } from '../services/song.service';
import { Song } from '../schemas/song.schema';
import { AuthNeeded } from '../../shared/decorators/auth.decorator';
import { Role } from '../../shared/types/role';
import { Roles } from '../../shared/decorators/roles.decorator';
import { IResponse } from '../../shared/types/response';
import { ISearchSongsResponse, ISongResponse, ISongsSearchResults } from '../types/song';
import { SongMessage } from '../types/message';
import { UpdateSongDto } from '../dtos/update-song.dto';
import { BaseSearchDto } from '../../shared/dtos/base-search.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller(SongPath.Base)
export class SongController {
  constructor(private songService: SongService) {}

  @Get(SongPath.Search)
  async search(@Query(new ValidationPipe()) body: BaseSearchDto): Promise<ISearchSongsResponse> {
    const songs: ISongsSearchResults = await this.songService.search(body);

    return {
      data: songs
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<ISongResponse> {
    const song: Song = await this.songService.get(id);

    return {
      data: song
    };
  }

  @ApiBearerAuth()
  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor, Role.SongEditor)
  @Post()
  async create(@Body(new ValidationPipe()) body: CreateSongDto): Promise<ISongResponse> {
    const createdSong: Song = await this.songService.create(body);

    return {
      data: createdSong
    };
  }

  @ApiBearerAuth()
  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor, Role.SongEditor)
  @Patch(':id')
  async update(
    @Body(new ValidationPipe()) body: UpdateSongDto,
    @Param('id') id: string
  ): Promise<ISongResponse> {
    const updatedSong: Song = await this.songService.update(body, id);

    return {
      data: updatedSong
    };
  }

  @ApiBearerAuth()
  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor, Role.SongEditor)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IResponse> {
    await this.songService.delete(id);

    return {
      message: SongMessage.DeleteSongSuccess
    };
  }
}