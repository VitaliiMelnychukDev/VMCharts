import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaUserName } from '../types/schema/user';
import { Model } from "mongoose";
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  private readonly emailField  = 'email';

  constructor(@InjectModel(SchemaUserName) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    const filters: Record<string, any>  = {};
    filters[this.emailField] = email;

    return this.userModel.findOne(filters).exec();
  }
}