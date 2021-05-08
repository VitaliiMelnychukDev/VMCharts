import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../shared/types/role';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @IsEnum(Role, {each: true})
  roles?: Role[];
}