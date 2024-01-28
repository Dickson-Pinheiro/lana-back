import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from "class-validator";

export class CreateMusicDto {
  @IsString({message: 'title must be a string'})
  @IsNotEmpty({message: 'title is required'})
  title: string;
  
  @IsString({message: 'videoId must be a string'})
  @IsNotEmpty({message: 'videoId is required'})
  videoId: string;

  @IsString({message: 'artist must be a string'})
  @IsNotEmpty({message: 'artist is required'})
  artist: string;
  
  @IsInt({message: 'title must be a integer'})
  @IsPositive({message: 'title is required'})
  playlistId: number
}
