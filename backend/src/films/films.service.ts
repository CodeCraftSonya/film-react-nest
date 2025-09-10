import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();
    return {
      total: films.length,
      items: films.map((f) => ({
        id: f.id,
        rating: f.rating,
        director: f.director,
        tags: f.tags,
        title: f.title,
        about: f.about,
        description: f.description,
        image: f.image,
        cover: f.cover,
      })),
    };
  }

  async findSchedule(filmId: string) {
    const film = await this.filmsRepository.findById(filmId);
    if (!film) {
      throw new NotFoundException(`Фильм с id=${filmId} не найден`);
    }
    return {
      total: film.schedule.length,
      items: film.schedule.map((s) => ({
        id: s.id,
        daytime: s.daytime,
        hall: s.hall,
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken,
      })),
    };
  }
}
