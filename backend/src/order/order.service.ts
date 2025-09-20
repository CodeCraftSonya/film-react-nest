import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsRepositoryMongoDB } from '../repository/filmsMongo.repository';
import { randomUUID } from 'crypto';
import { FilmsRepositoryPostgres } from '../repository/filmsPostgres.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | FilmsRepositoryMongoDB
      | FilmsRepositoryPostgres,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    console.log('CreateOrderDto:', dto);

    const film = await this.filmsRepository.findById(dto.tickets[0].film);
    if (!film) {
      throw new NotFoundException(
        `Фильм с id=${dto.tickets[0].film} не найден`,
      );
    }

    const schedule = film.schedule.find((s) => s.id === dto.tickets[0].session);
    if (!schedule) {
      throw new NotFoundException(
        `Сеанс с id=${dto.tickets[0].session} не найден`,
      );
    }
    // проверка занятых мест
    const seatStrings = dto.tickets.map((t) => `${t.row}:${t.seat}`);
    const alreadyTaken = seatStrings.filter((seat) =>
      schedule.taken.includes(seat),
    );
    if (alreadyTaken.length > 0) {
      throw new BadRequestException(
        `Места уже заняты: ${alreadyTaken.join(', ')}`,
      );
    }

    console.log('Film:', film.id);
    console.log('Schedule:', schedule.id, schedule.taken);

    // бронируем места
    schedule.taken.push(...seatStrings);
    await this.filmsRepository.save(film as any);

    // формируем список заказов
    const orders = dto.tickets.map((ticket) => ({
      film: ticket.film,
      session: ticket.session, // это schedule.id
      daytime: ticket.daytime,
      row: ticket.row,
      seat: ticket.seat,
      price: ticket.price,
      id: randomUUID(),
    }));

    return {
      total: orders.length,
      items: orders,
    };
  }
}
