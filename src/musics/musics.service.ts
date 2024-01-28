import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MusicsService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createMusicDto: CreateMusicDto) {
    const playlistWithId =  await this.prismaService.playlist.findUnique({
      where: {
        id: createMusicDto.playlistId
      }
    })

    const playlistWithVideoId = await this.prismaService.music.findFirst({
      where: {
        videoId: createMusicDto.videoId
      }
    })

    if(!playlistWithId){
      throw new ConflictException({message: "playlist not exists"})
    }
    if(playlistWithVideoId){
      throw new ConflictException({message: "music already includes in playlist"})
    }
    return await this.prismaService.music.create({
      data: createMusicDto
    })
  }

  async findAll(playlistId: number) {
    return await this.prismaService.music.findMany({
      where: {
        playlistId
      }
    })
  }

  async findOne(id: number) {
    return await this.prismaService.music.findUnique({
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    return await this.prismaService.music.delete({
      where: {
        id
      }
    }) 
  }
}
