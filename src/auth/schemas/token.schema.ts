import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { SchemaUserName } from '../types/schema/user';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({type: MongooseSchema.Types.ObjectId, ref: SchemaUserName, required: true})
  user: User;

  @Prop({required: true})
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);