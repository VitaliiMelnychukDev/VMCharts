import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { RockGenre } from '../types/chart';

export type ChartDocument = Chart & Document;

@Schema()
export class Chart {
  _id: string

  @Prop({required: true})
  name: string;

  @Prop()
  genre?: RockGenre;

  @Prop({
    type: [{
      position: {
        type: Number
      },
      song: {
        type: MongooseSchema.Types.ObjectId
      }
    }]
  })
  songs?: [{
    position: number;
    song: string;
  }]
}

export const ChartSchema = SchemaFactory.createForClass(Chart);