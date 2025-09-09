//TODO реализовать DTO для /orders

export class CreateOrderDto {
  readonly filmId: string;
  readonly seats: number[];
  readonly userId: string;
}
