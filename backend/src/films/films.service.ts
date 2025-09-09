import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {
  findAll() {
    return { message: 'Список фильмов (пустышка)' };
  }

  findSchedule(id: string) {
    return { message: `Расписание фильма c id=${id} (пустышка)` };
  }
}
