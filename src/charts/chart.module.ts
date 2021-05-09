import { ChartController } from './controllers/chart.controller';
import { Module } from '@nestjs/common';
import { ChartService } from './services/chart.service';
import { SongController } from './controllers/song.controller';
import { SongService } from './services/song.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SongSchema } from './schemas/song.schema';
import { SongSchemaName } from './types/schema/song';
import { ChartSchemaName } from './types/schema/chart';
import { ChartSchema } from './schemas/chart.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: SongSchemaName,
      schema: SongSchema
    },
    {
      name: ChartSchemaName,
      schema: ChartSchema
    }
  ])],
  providers: [ChartService, SongService],
  controllers: [ChartController, SongController]
})
export class ChartModule {}
