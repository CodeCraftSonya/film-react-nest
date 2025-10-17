import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';
import { DevLogger } from './logger/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOG_FORMAT || 'dev';

  const logger =
    loggerType === 'json'
      ? new JsonLogger()
      : loggerType === 'tskv'
        ? new TskvLogger()
        : new DevLogger();

  app.useLogger(logger);

  await app.listen(3000, '0.0.0.0');
  console.log(
    `🚀 App running on http://localhost:3000 using ${loggerType.toUpperCase()} logger`,
  );
}

bootstrap();
