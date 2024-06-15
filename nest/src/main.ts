import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: JSON.parse(process.env.LOGGER_LEVELS),
  });

  // CORS
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  // request body validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger API docs
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
