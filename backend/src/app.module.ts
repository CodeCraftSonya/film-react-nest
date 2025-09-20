// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
// import { join } from 'path';
// import { Film, FilmSchema } from './films/schemas/film.schema';
import * as path from 'node:path';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { applicationConfig, configProvider } from './app.config.provider';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    DatabaseModule.register(applicationConfig.DATABASE_DRIVER),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   cache: true,
    //   envFilePath: '.env',
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('DATABASE_URL'),
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService],
})
export class AppModule {}
