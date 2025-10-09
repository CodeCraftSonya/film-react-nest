import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const mockFilmsService = {
      findAll: jest.fn(),
      findSchedule: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: mockFilmsService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('контроллер существует', () => {
    expect(controller).toBeDefined();
  });

  it('должен возвращать результат filmsService.findAll()', async () => {
    const mockFilms = [
      { id: 1, title: 'Inception' },
      { id: 2, title: 'Interstellar' },
    ];

    (service.findAll as jest.Mock).mockResolvedValue(mockFilms);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockFilms);
  });

  it('должен вызывать filmsService.findSchedule() с корректным id', async () => {
    const mockSchedule = {
      filmId: '1',
      sessions: [{ time: '18:00' }, { time: '21:00' }],
    };

    (service.findSchedule as jest.Mock).mockResolvedValue(mockSchedule);

    const result = await controller.findSchedule('1');

    expect(service.findSchedule).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockSchedule);
  });
});
