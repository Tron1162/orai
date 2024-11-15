// src/songs/songs.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Song } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; artist: string; length: number; price: number; rating: number }): Promise<Song> {
    return this.prisma.song.create({ data });
  }

  async findAll(): Promise<Song[]> {
    return this.prisma.song.findMany();
  }

  async findOne(id: number): Promise<Song> {
    return this.prisma.song.findUnique({ where: { id } });
  }

  async update(id: number, data: { title?: string; artist?: string; length?: number; price?: number; rating?: number }): Promise<Song> {
    return this.prisma.song.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Song> {
    return this.prisma.song.delete({ where: { id } });
  }

  async findFree(): Promise<Song[]> {
    return this.prisma.song.findMany({ where: { price: 0 } });
  }

  async findTop(count: number = 10): Promise<Song[]> {
    return this.prisma.song.findMany({ orderBy: { rating: 'desc' }, take: count });
  }

  async findPopularArtists(): Promise<{ artist: string; numberOfSongs: number }[]> {
    const songs = await this.prisma.song.groupBy({
      by: ['artist'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });
    return songs.map(song => ({ artist: song.artist, numberOfSongs: song._count.id }));
  }
}
