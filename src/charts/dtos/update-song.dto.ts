import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsInt()
  @IsOptional()
  year?: number;
}