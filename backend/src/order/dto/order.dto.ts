//TODO реализовать DTO для /orders

export class CreateOrderDto {
  readonly filmId: string;
  readonly scheduleId: string;
  readonly seats: string[];
}
