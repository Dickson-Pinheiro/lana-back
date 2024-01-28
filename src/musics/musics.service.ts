import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MusicsService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createMusicDto: CreateMusicDto) {
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
