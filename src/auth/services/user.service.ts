import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SchemaUserName } from '../types/schema/user.schema';
import { UserError } from '../types/error';
import { HashService } from './hash.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(SchemaUserName) private userModel: Model<UserDocument>, private hashService: HashService) {}

  async create(user: CreateUserDto): Promise<User> {
    const userToStore = {...user};
    userToStore.password = await this.hashService.hashString(userToStore.password);
    const createdUser = new this.userModel(userToStore);

    return createdUser
      .save()
      .catch(() => {
        throw new BadRequestException(UserError.CreateUserFail);
      });
  }
}