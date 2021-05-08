import { IsNumber, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsNumber()
  year: number;
}