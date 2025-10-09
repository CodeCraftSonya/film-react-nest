import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const mockOrderService = {
      createOrder: jest.fn().mockResolvedValue({ id: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('контроллер существует', () => {
    expect(controller).toBeDefined();
  });

  it('должен вызывать OrderService.createOrder', async () => {
    const dto: CreateOrderDto = {
      email: 'test@example.com',
      phone: '+71234567890',
      tickets: [
        {
          film: 'Inception',
          session: 'evening',
          row: 3,
          seat: 7,
          price: 500,
          daytime: '2025-10-09T18:30:00Z',
          day: 'Thursday',
          time: '18:30',
        },
        {
          film: 'Inception',
          session: 'evening',
          row: 3,
          seat: 8,
          price: 500,
          daytime: '2025-10-09T18:30:00Z',
        },
      ],
    };

    const expectedResponse = {
      id: 101,
      ...dto,
      createdAt: new Date().toISOString(),
    };

    (service.createOrder as jest.Mock).mockResolvedValue(expectedResponse);

    const result = await controller.createOrder(dto);

    expect(service.createOrder).toHaveBeenCalledTimes(1);
    expect(service.createOrder).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResponse);
  });
});
