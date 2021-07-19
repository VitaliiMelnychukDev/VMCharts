import { IsInt, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsInt()
  year: number;
}