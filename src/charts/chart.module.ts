import { ChartController } from './controllers/chart.controller';
import { Module } from '@nestjs/common';
import { ChartService } from './services/chart.service';
import { SongController } from './controllers/song.controller';
import { SongService } from './services/song.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './schemas/song.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Song.name,
      schema: SongSchema
    }
  ])],
  providers: [ChartService, SongService],
  controllers: [ChartController, SongController]
})
export class ChartModule {}
