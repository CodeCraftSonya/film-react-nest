import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from '../films/entities/film.entity';
import { FilmsRepository } from './films.repository.interface';

@Injectable()
export class FilmsRepositoryPostgres implements FilmsRepository<FilmEntity> {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
  ) {}

  async findAll(): Promise<FilmEntity[]> {
    return this.filmRepository.find({
      select: [
        'id',
        'rating',
        'director',
        'about',
        'cover',
        'description',
        'image',
        'tags',
        'title',
      ],
    });
  }

  async findById(id: string): Promise<FilmEntity | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async save(film: FilmEntity): Promise<FilmEntity> {
    return this.filmRepository.save(film);
  }
}
