import { Body, Controller, Post } from '@nestjs/common';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { SongPath } from '../types/paths/song';
import { CreateSongDto } from '../dtos/create-song.dto';
import { SongService } from '../services/song.service';
import { Song } from '../schemas/song.schema';

@Controller(SongPath.Base)
export class SongController {
  constructor(private songService: SongService) {
  }

  @Post()
  create(@Body(new ValidationPipe()) song: CreateSongDto): Promise<Song> {
    return this.songService.create(song);
  }
}