import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { SongPath } from '../types/paths/song';
import { CreateSongDto } from '../dtos/create-song.dto';
import { SongService } from '../services/song.service';
import { Song } from '../schemas/song.schema';
import { AuthNeeded } from '../../shared/decorators/auth.decorator';
import { Role } from '../../shared/types/role';
import { Roles } from '../../shared/decorators/roles.decorator';
import { IResponse } from '../../shared/types/response';
import { ISongResponse } from '../types/song';
import { SongMessage } from '../types/message';
import { UpdateSongDto } from '../dtos/update-song.dto';

@Controller(SongPath.Base)
export class SongController {
  constructor(private songService: SongService) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<ISongResponse> {
    const song: Song = await this.songService.get(id);

    return {
      data: song
    };
  }

  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor, Role.SongEditor)
  @Post()
  async create(@Body(new ValidationPipe()) song: CreateSongDto): Promise<ISongResponse> {
    const createdSong: Song = await this.songService.create(song);

    return {
      data: createdSong
    };
  }

  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor, Role.SongEditor)
  @Patch(':id')
  async update(
    @Body(new ValidationPipe()) song: UpdateSongDto,
    @Param('id') id: string
  ): Promise<ISongResponse> {
    const updatedSong: Song = await this.songService.update(song, id);

    return {
      data: updatedSong
    };
  }

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