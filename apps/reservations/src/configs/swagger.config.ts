import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static readonly document = (app: INestApplication<any>) =>
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Reservation API Docs')
        .setVersion('1.0')
        .addTag('Reservations')
        .build(),
    );
}
