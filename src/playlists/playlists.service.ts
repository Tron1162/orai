// src/playlists/playlists.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Playlist, Song } from '@prisma/client';

@Injectable()
export class PlaylistsService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<Playlist> {
    return this.prisma.playlist.create({ data: { name } });
  }

  async findOne(id: number): Promise<Playlist & { songs: Song[] }> {
    return this.prisma.playlist.findUnique({ where: { id }, include: { songs: true } });
  }

  async addSongToPlaylist(playlistId: number, songId: number): Promise<void> {
    await this.prisma.playlist.update({
      where: { id: playlistId },
      data: { songs: { connect: { id: songId } } },
    });
  }

  async removeSongFromPlaylist(playlistId: number, songId: number): Promise<void> {
    await this.prisma.playlist.update({
      where: { id: playlistId },
      data: { songs: { disconnect: { id: songId } } },
    });
  }

  async removePlaylist(id: number): Promise<void> {
    await this.prisma.playlist.delete({ where: { id } });
  }
}
