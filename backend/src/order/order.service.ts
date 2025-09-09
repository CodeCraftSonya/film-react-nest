import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  createOrder(dto: CreateOrderDto) {
    return { message: 'Заказ создан (пустышка)', data: dto };
  }
}
