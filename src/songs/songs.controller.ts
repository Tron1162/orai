// src/songs/songs.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: { title: string; artist: string; length: number; price: number; rating: number }) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: { title?: string; artist?: string; length?: number; price?: number; rating?: number }) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }

  @Get('free')
  findFree() {
    return this.songsService.findFree();
  }

  @Get('top')
  findTop(@Query('count') count: string) {
    return this.songsService.findTop(count ? +count : 10);
  }

  @Get('popularArtists')
  findPopularArtists() {
    return this.songsService.findPopularArtists();
  }
}
