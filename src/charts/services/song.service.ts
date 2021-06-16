import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from '../dtos/create-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from '../schemas/song.schema';
import { Model } from 'mongoose';
import { SongError } from '../types/error';
import { UpdateSongDto } from '../dtos/update-song.dto';
import { SongSchemaName } from '../types/schema/song';
import { ISongsSearchResults } from '../types/song';
import { SongRepository } from '../repositories/song.repository';
import { BaseSearchDto } from '../../shared/dtos/base-search.dto';

@Injectable()
export class SongService {
  constructor(@InjectModel(SongSchemaName) private songModel: Model<SongDocument>, private songRepository: SongRepository) {}


  public async search(searchDto: BaseSearchDto): Promise<ISongsSearchResults> {
    try {
      return await this.songRepository.searchSongs(searchDto);
    } catch (e) {
      throw new BadRequestException(SongError.SearchSongsError);
    }
  }

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
    } catch(e) {
      throw new BadRequestException(SongError.UpdateSongError);
    }

    return this.get(songId);
  }

  async get(songId: string): Promise<Song> {
    let song: Song | null = null;

    try {
      song = await this.songModel.findOne({ _id: songId });
    } catch(e) {
      throw new BadRequestException(SongError.GetSongError);
    }

    if (!song) {
      throw new NotFoundException();
    }

    return song;
  }

  async delete(songId: string): Promise<boolean> {
    let song: Song | null = null;

    try {
      song = await this.songModel.findOneAndDelete({ _id: songId });
    } catch(e) {
      throw new BadRequestException(SongError.DeleteSongError);
    }

    if (!song) {
      throw new NotFoundException();
    }

    return true;
  }
}