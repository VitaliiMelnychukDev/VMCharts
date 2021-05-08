import { Command, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { Role } from '../../shared/types/role';

@Injectable()
export class UserCommand {
  constructor(private readonly userService: UserService) {}


  @Command({
    command: 'create:admin',
  })
  async createAdmin(
    @Option({
      name: 'username',
      type: 'string',
      require: 'true'
    })
      name: string,
    @Option({
      name: 'email',
      type: 'string',
      required: true
    })
      email: string,
    @Option({
      name: 'password',
      type: 'string',
      required: true
    })
      password: string,

  ): Promise<User> {
    //TODO add validation here
    return this.userService.create({
      name,
      password,
      email,
      roles: [Role.Admin]
    });
  }

}