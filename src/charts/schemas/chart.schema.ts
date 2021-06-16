import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { RockGenre } from '../types/chart';
import { SongSchemaName } from '../types/schema/song';

export type ChartDocument = Chart & Document;

@Schema()
export class SongsItem {
  position: number;
  song: string;
}

@Schema()
export class Chart {
  _id: string

  @Prop({required: true})
  name: string;

  @Prop()
  description?: string;

  @Prop()
  slug: string;

  @Prop()
  genre?: RockGenre;

  @Prop({
    type: [{
      position: {
        type: Number,
        required: true
      },
      song: {
        type: MongooseSchema.Types.ObjectId,
        ref: SongSchemaName,
        required: true
      }
    }]
  })
  songs?: SongsItem[]
}

export const ChartSchema = SchemaFactory.createForClass(Chart);