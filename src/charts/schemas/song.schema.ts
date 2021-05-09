import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SongDocument = Song & Document;

@Schema()
export class Song {
  _id: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  author: string;

  @Prop({required: true})
  year: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);