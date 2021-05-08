import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { CommandModule } from 'nestjs-command';
import { UserCommand } from './command/user.command';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { SchemaUserName } from './types/schema/user.schema';
import { HashService } from './services/hash.service';
import { UserRepository } from './repositories/user.repository';
import { SharedModule } from '../shared/shared.module';
import { TokenSchemaName } from './types/schema/token.schema';
import { TokenSchema } from './schemas/token.schema';
import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [
    SharedModule,
    CommandModule,
    MongooseModule.forFeature([
      {
        name: SchemaUserName,
        schema: UserSchema
      },
      {
        name: TokenSchemaName,
        schema: TokenSchema
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, HashService, UserCommand, UserRepository, TokenRepository]
})
export class AuthModule {

}