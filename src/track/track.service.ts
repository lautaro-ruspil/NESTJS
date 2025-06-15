import { Injectable } from '@nestjs/common';
import { Track } from './track.interface';

const BASE_URL = 'http://localhost:3030/tracks/';

@Injectable()
export class TrackService {
  async getTracks(): Promise<Track[]> {
    const res = await fetch(BASE_URL);
    const parsed = (await res.json()) as Track[];
    return parsed;
  }

  async getTrackById(id: number): Promise<Track> {
    const res = await fetch(BASE_URL + id);
    const parsed = (await res.json()) as Track;
    return parsed;
  }

  // Metodo para crear un nuevo track
  async createTrack(track: Track): Promise<Track> {
    const idn = await this.setId();
    const newTrack: Track = {
      id: idn,
      title: track.title,
      duration: track.duration,
      artist: track.artist,
    };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(newTrack),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const parsed = (await res.json()) as Track;
    return parsed;
  }

  // Metodo para asignar un ID autoincremental a un nuevo track
  private async setId(): Promise<number> {
    const tracks = await this.getTracks();
    const id: number = Number(tracks[tracks.length - 1].id) + 1;
    return id;
  }

  // Metodo para borrar un Track por ID
  async deleteTrackById(id: number): Promise<any> {
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    const parsed = res.json();
    return parsed;
  }

  // Metodo para actualizar un track por ID
  async updateTrackById(id: number, body: Track): Promise<Track | undefined> {
    const isTrack = await this.getTrackById(id);
    if (!Object.keys(isTrack).length) return;
    const updateTrack = { ...body, id };
    console.log('Updated Track:', updateTrack.title);
    const res = await fetch(BASE_URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateTrack),
    });

    const parsed = res.json();
    return parsed;
  }
}
