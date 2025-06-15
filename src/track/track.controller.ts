import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';

@Controller('track') // Ruta Base
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  // Metodo para obtener todos los tracks
  @Get()
  getTracks(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  // Metodo para obtener un track por ID
  @Get(':id')
  getTrackById(@Param('id') id: number): Promise<Track> {
    return this.trackService.getTrackById(id);
  }

  // Metodo para crear un track
  @Post()
  createTrack(@Body() body: Track): Promise<Track> {
    return this.trackService.createTrack(body);
  }

  // Metodo para eliminar un Track
  @Delete(':id')
  deleteTrackById(@Param('id') id: number): Promise<any> {
    return this.trackService.deleteTrackById(id);
  }

  @Put(':id')
  updateTrackById(@Param('id') id: number, @Body() body) {
    return this.trackService.updateTrackById(id, body);
  }
}
