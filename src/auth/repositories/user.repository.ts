import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaUserField, SchemaUserName } from '../types/schema/user.schema';
import { Model } from "mongoose";
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  private readonly emailField  = 'email';

  constructor(@InjectModel(SchemaUserName) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    const filters = {};
    filters[this.emailField] = email;

    return this.userModel.findOne(filters).exec();
  }
}