import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../shared/types/role';
export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  name: string

  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);