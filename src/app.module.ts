// src/app.module.ts
import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [SongsModule, PlaylistsModule],
  providers: [PrismaService],
})
export class AppModule {}
