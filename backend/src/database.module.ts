import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { applicationConfig } from './app.config.provider';
import { Film, FilmSchema } from './films/schemas/film.schema';
import { FilmEntity } from './films/entities/film.entity';
import { ScheduleEntity } from './films/entities/schedule.entity';
import { FilmsRepositoryMongoDB } from './repository/filmsMongo.repository';
import { FilmsRepositoryPostgres } from './repository/filmsPostgres.repository';

@Module({})
export class DatabaseModule {
  static register(dbms: string): DynamicModule {
    const imports = [];
    const providers: Provider[] = [];
    const exports = [];

    switch (dbms) {
      case 'mongodb':
        imports.push(
          MongooseModule.forRoot(applicationConfig.DATABASE_URL),
          MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: FilmsRepositoryMongoDB,
        });
        exports.push('FILMS_REPOSITORY');
        break;

      case 'postgres':
      default:
        imports.push(
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: applicationConfig.DATABASE_HOST,
            port: +applicationConfig.DATABASE_PORT,
            username: applicationConfig.DATABASE_USERNAME,
            password: applicationConfig.DATABASE_PASSWORD,
            database: applicationConfig.DATABASE_NAME,
            entities: [FilmEntity, ScheduleEntity],
            synchronize: false,
          }),
          TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: FilmsRepositoryPostgres,
        });
        exports.push('FILMS_REPOSITORY');
        break;
    }

    return {
      module: DatabaseModule,
      imports,
      providers,
      exports,
    };
  }
}
