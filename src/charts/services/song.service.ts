import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateSongDto } from '../dtos/create-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from '../schemas/song.schema';
import { Model } from 'mongoose';

@Injectable()
export class SongService {
  constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>) {}

  create(song: CreateSongDto): Promise<Song> {
    const createdSong = new this.songModel(song);

    return createdSong.save();
  }
}