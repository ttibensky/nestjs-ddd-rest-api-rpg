import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DebugHttpExceptionFilter } from './lib/common/infrastructure/delivery/http/filter/DebugHttpExceptionFilter';

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

  // include exception details in the response body while on local/test environment
  if (process.env.ENV === 'local') {
    app.useGlobalFilters(new DebugHttpExceptionFilter());
  }

  // Swagger API docs
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
