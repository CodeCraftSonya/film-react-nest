import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('api/afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  // список фильмов
  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  // фильм с расписанием
  @Get(':id/schedule')
  findSchedule(@Param('id') id: string) {
    return this.filmsService.findSchedule(id);
  }
}
