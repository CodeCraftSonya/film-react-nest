// export class CreateOrderDto {
//   readonly filmId: string;
//   readonly scheduleId: string;
//   readonly seats: string[];
// }

export class CreateOrderDto {
  readonly email: string;
  readonly phone: string;
  readonly tickets: {
    film: string;
    session: string; // соответствует scheduleId
    row: number;
    seat: number;
    price: number;
    daytime: string;
    day?: string;
    time?: string;
  }[];
}
