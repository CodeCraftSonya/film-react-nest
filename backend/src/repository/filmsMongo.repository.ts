import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { FilmsRepository } from './films.repository.interface';

@Injectable()
export class FilmsRepositoryMongoDB implements FilmsRepository<FilmDocument> {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find({}, { schedule: 0 }).exec();
  }

  async findById(id: string): Promise<FilmDocument | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async save(film: FilmDocument): Promise<FilmDocument> {
    return film.save();
  }
}
