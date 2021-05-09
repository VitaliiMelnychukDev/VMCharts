import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from '../dtos/create-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from '../schemas/song.schema';
import { Model } from 'mongoose';
import { SongError } from '../types/error';
import { UpdateSongDto } from '../dtos/update-song.dto';
import { SongSchemaName } from '../types/schema/song';

@Injectable()
export class SongService {
  constructor(@InjectModel(SongSchemaName) private songModel: Model<SongDocument>) {}

  async create(song: CreateSongDto): Promise<Song> {
    try {
      const createdSong: SongDocument = new this.songModel(song);

      return await createdSong.save();
    } catch {
      throw new BadRequestException(SongError.CreateSongError);
    }
  }

  async update(song: UpdateSongDto, songId: string): Promise<Song> {
    try {
      await this.songModel.updateOne({ _id: songId }, song);

      return this.get(songId);
    } catch(e) {
      this.handleException(e, SongError.UpdateSongError);
    }
  }

  async get(songId: string): Promise<Song> {
    try {
      const song: Song | null = await this.songModel.findOne({ _id: songId });

      if (!song) {
        throw new NotFoundException();
      }

      return song;
    } catch(e) {
      this.handleException(e, SongError.GetSongError);
    }
  }

  async delete(songId: string): Promise<boolean> {
    try {
      const song: Song | null = await this.songModel.findOneAndDelete({ _id: songId });

      if (!song) {
        throw new NotFoundException();
      }

      return true;
    } catch(e) {
      this.handleException(e, SongError.DeleteSongError);
    }
  }

  private handleException(e: any, badRequestErrorMessage: SongError) {
    if (e instanceof NotFoundException) {
      throw new NotFoundException();
    } else {
      throw new BadRequestException(badRequestErrorMessage);
    }
  }
}