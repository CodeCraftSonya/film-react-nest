import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsRepository } from '../films/films.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(dto: CreateOrderDto) {
    const film = await this.filmsRepository.findById(dto.filmId);
    if (!film) {
      throw new NotFoundException(`Фильм с id=${dto.filmId} не найден`);
    }

    const schedule = film.schedule.find((s) => s.id === dto.scheduleId);
    if (!schedule) {
      throw new NotFoundException(`Сеанс с id=${dto.scheduleId} не найден`);
    }

    // проверка занятых мест
    const alreadyTaken = dto.seats.filter((seat) =>
      schedule.taken.includes(seat),
    );
    if (alreadyTaken.length > 0) {
      throw new BadRequestException(
        `Места уже заняты: ${alreadyTaken.join(', ')}`,
      );
    }

    // бронируем места
    schedule.taken.push(...dto.seats);
    await film.save();

    // формируем список заказов
    const orders = dto.seats.map((seat) => {
      const [row, seatNum] = seat.split(':').map(Number);
      return {
        film: film.id,
        session: schedule.id,
        daytime: schedule.daytime,
        row,
        seat: seatNum,
        price: schedule.price,
        id: randomUUID(),
      };
    });

    return {
      total: orders.length,
      items: orders,
    };
  }
}
