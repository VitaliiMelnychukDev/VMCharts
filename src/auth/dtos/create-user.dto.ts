import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/types/role';
import { LoginUserDto } from './login-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsEnum(Role, {each: true})
  roles?: Role[];
}