import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsNumberString()
  year: number;
}