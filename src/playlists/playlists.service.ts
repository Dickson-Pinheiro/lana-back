import { ConflictException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PlaylistsService {

  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createPlaylistDto: CreatePlaylistDto, userId: number) {
    return await this.prismaService.playlist.create({
      data: {
        ...createPlaylistDto,
        ownerId: userId
      }
    })
  }

  async findAll(ownerId: number) {
    return this.prismaService.playlist.findMany({
      where: {
        ownerId
      }
    })
  }

  async findOne(id: number) {
    return this.prismaService.playlist.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto, userId: number) {
    const playlist = await this.findOne(id)
    if(playlist.ownerId !== userId){
      throw new ForbiddenException({
        message: 'access denied',
      })
    }
    return await this.prismaService.playlist.update({
      where: {
        id,
      },
      data: updatePlaylistDto,
      select: {
        name: true,
        id: true,
        ownerId: true
      }
    })
  }

  async remove(id: number, userId: number) {
    const playlist = await this.findOne(id)
    if(!playlist){
      return;
    }
    if(playlist.ownerId !== userId){
      throw new ConflictException({
        message: "access denied"
      })
    }
    await this.prismaService.playlist.delete({
      where: {
        id,
        AND: {
          ownerId: userId
        }
      }
    })
  }
}
