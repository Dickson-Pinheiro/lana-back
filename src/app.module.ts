import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './database/prisma.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { MusicsModule } from './musics/musics.module';

@Module({
  imports: [UsersModule, PrismaModule, PlaylistsModule, MusicsModule],
})
export class AppModule {}
