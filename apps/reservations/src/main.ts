import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SwaggerConfig } from '@app/common/config';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useLogger(app.get(Logger));

  SwaggerConfig.setup({
    path: '/docs',
    app,
    name: 'Reservations',
    version: '1.0',
    tags: [
      {
        name: 'Reservations',
        description: '예약',
      },
    ],
  });

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
