// src/playlists/playlists.controller.ts
import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.playlistsService.create(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(+id);
  }

  @Post(':listid/:songid')
  addSongToPlaylist(@Param('listid') listId: string, @Param('songid') songId: string) {
    return this.playlistsService.addSongToPlaylist(+listId, +songId);
  }

  @Delete(':listid/:songid')
  removeSongFromPlaylist(@Param('listid') listId: string, @Param('songid') songId: string) {
    return this.playlistsService.removeSongFromPlaylist(+listId, +songId);
  }

  @Delete(':listid')
  removePlaylist(@Param('listid') listId: string) {
    return this.playlistsService.removePlaylist(+listId);
  }
}
