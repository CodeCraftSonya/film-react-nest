export class CreateOrderDto {
  readonly email: string;
  readonly phone: string;
  readonly tickets: {
    film: string;
    session: string;
    row: number;
    seat: number;
    price: number;
    daytime: string;
    day?: string;
    time?: string;
  }[];
}
