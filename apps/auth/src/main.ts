import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from '@app/common/config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useLogger(app.get(Logger));

  SwaggerConfig.setup({
    path: '/docs',
    app,
    name: 'Users',
    version: '1.0',
    tags: [
      {
        name: 'Users',
        description: '사용자',
      },
      {
        name: 'Auth',
        description: '인증',
      },
    ],
  });

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
