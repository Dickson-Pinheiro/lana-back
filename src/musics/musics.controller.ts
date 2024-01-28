import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicsService.create(createMusicDto);
  }

  @Get()
  findAll(@Param('playlist') playlistId) {
    return this.musicsService.findAll(+playlistId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicsService.remove(+id);
  }
}
